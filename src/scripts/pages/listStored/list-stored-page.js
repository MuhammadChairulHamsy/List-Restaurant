import {
  generateLoaderAbsoluteTemplate,
  generateReportItemTemplate,
} from "../../templates";
import ListStoredPresenter from "./list-stored-presenter";
import Map from "../../utils/map";
import Database from "../../data/database";

export default class ListStoredPage {
  #presenter = null;
  #map = null;

  async render() {
    return `
      <section>
        <div class="reports-list__map__container">
          <div id="map" class="reports-list__map"></div>
          <div id="map-loading-container"></div>
        </div>
      </section>

      <section class="list-restaurant">
        <h1 class="section-title">List <span>Restaurant</span> Stored</h1>
            <div class="reports-list__container">
                <div id="reports-list">
            </div>
            </div>
          <div id="reports-list-loading-container"></div>
        </section>
        `;
  }

  async afterRender() {
    this.#presenter = new ListStoredPresenter({
      view: this,
      model: Database,
    });

    await this.#presenter.initialGalleryAndMap();
  }

  async initialMap() {
    this.#map = await Map.build("#map", {
      zoom: 10,
      locate: true,
    });
  }

  showMapLoading() {
    document.getElementById("map-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideMapLoading() {
    document.getElementById("map-loading-container").innerHTML = "";
  }

  showLoading() {
    document.getElementById("reports-list-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById("reports-list-loading-container").innerHTML = "";
  }

  populateReportsList(message, reports) {
    const container = document.getElementById("reports-list");

    if (!reports || reports.length <= 0) {
      container.innerHTML = `
        <p class="text-center text-gray-500">Belum ada restoran yang tersedia.</p>
      `;
      return;
    }

    const html = reports.reduce((accumulator, report) => {
      if (this.#map && report.lat != null && report.lon != null) {
        const coordinate = [report.lat, report.lon];
        const markerOptions = { alt: report.description };
        const popupOptions = { content: report.description };
        this.#map.addMarker(coordinate, markerOptions, popupOptions);
      }

      return accumulator.concat(
        generateReportItemTemplate({
          id: report.id,
          description: report.description,
          photoUrl: report.photoUrl,
          name: report.name,
          createdAt: report.createdAt,
          lat: report.lat ?? "-",
          lon: report.lon ?? "-",
          isLocal: Boolean(report.isLocal), // asumsikan data lokal punya field khusus
        })
      );
    }, "");

    container.innerHTML = `<div class="reports-list">${html}</div>`;

    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", async (event) => {
        console.log("Delete button clicked", event);
        const id = event.target.dataset.id;
        if (!id) {
          console.warn("id tidak ditemukan di tombol hapus");
          return;
        }

        const confirmed = confirm("Yakin ingin menghapus data ini?");
        if (!confirmed) return;

        try {
          await Database.removeReport(id);
          // Hapus elemen di UI
          const reportItem = event.target.closest(".report-item");
          if (reportItem) {
            reportItem.remove();
          }
        } catch (error) {
          console.error("Gagal hapus data:", error);
          alert("Gagal menghapus data.");
        }
      });
    });
  }

  populateReportsListError(message) {
    document.getElementById("reports-list").innerHTML = `
      <p class="text-center text-red-500">Gagal memuat data: ${message}</p>
    `;
  }
}
