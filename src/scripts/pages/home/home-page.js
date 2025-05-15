import {
  generateLoaderAbsoluteTemplate,
  generateReportItemTemplate,
} from "../../templates";
import HomePresenter from "./home-presenter";
import Map from "../../utils/map";
import * as RestaurantAPI from "../../data/api";

export default class HomePage {
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
        <h1 class="section-title">Daftar <span>Restaurant</span></h1>
            <div class="reports-list__container">
            <div id="reports-list">
            </div>
            </div>
          <div id="reports-list-loading-container"></div>
        </section>
        `;
      }

  async afterRender() {
    this.#presenter = new HomePresenter({
      view: this,
      model: RestaurantAPI,
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
    if (!reports || reports.length <= 0) {
      document.getElementById("reports-list").innerHTML = `
    <p class="text-center text-gray-500">Belum ada restoran yang tersedia.</p>
  `;
      return;
    }

    const html = reports.reduce((accumulator, report) => {
      // Tambahkan marker jika lat/lon tersedia
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
        })
      );
    }, "");

    document.getElementById("reports-list").innerHTML = `
    <div class="reports-list">${html}</div>
  `;
  }

  populateReportsListError(message) {
    document.getElementById("reports-list").innerHTML = `
      <p class="text-center text-red-500">Gagal memuat data: ${message}</p>
    `;
  }
}

