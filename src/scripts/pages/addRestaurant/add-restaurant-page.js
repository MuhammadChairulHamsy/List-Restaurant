import AddRestaurantPresenter from "./add-restaurant-presenter";
import navigateTo from "../../utils/navigation";
import Camera from "../../utils/camera";
import L from "leaflet";
import Database from "../../data/database";

export default class AddRestaurantPage {
  constructor() {
    this.photoBlob = null;
    this.fileBlob = null;
    this.camera = null;
    this.presenter = new AddRestaurantPresenter(this);
  }

  getTemplate() {
    return `
      <section class="form-section">
        <h1>Form Tambah Restoran</h1>
        <form id="add-restaurant-form">
          <div class="form-group">
            <label for="name">Nama Restoran:</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div class="form-group">
            <label for="description">Deskripsi:</label>
            <textarea id="description" name="description" required rows="4"></textarea>
          </div>

          <div class="form-group">
            <label for="cameraSelect">Ambil Foto Restoran:</label>
            <select id="cameraSelect"></select>
            <div class="video-container">
              <video id="camera" autoplay playsinline></video>
            </div>
            <canvas id="canvas"></canvas>
            <button type="button" id="takePictureButton">Ambil Foto</button>
          </div>

          <div class="form-group">
            <label for="fileInput">Atau Upload Foto Restoran:</label>
            <input type="file" id="fileInput" accept="image/*" />
          </div>

          <div class="form-group">
            <label>Pilih Lokasi di Peta:</label>
            <div id="map"></div>
          </div>

          <input type="hidden" id="lat" name="lat" required />
          <input type="hidden" id="lon" name="lon" required />

          <button type="submit">Tambah Restoran</button>
          <button type="button" id="saveToIndexedDB">Simpan Restaurant</button>
        </form>
      </section>
    `;
  }

  async initCamera() {
    this.camera = new Camera({
      video: document.querySelector("#camera"),
      cameraSelect: document.querySelector("#cameraSelect"),
      canvas: document.querySelector("#canvas"),
    });
    await this.camera.launch();

    document
      .querySelector("#takePictureButton")
      ?.addEventListener("click", async () => {
        this.photoBlob = await this.camera.takePicture();
        if (this.photoBlob) {
          alert("Foto berhasil diambil dari kamera.");
        } else {
          alert("Gagal mengambil foto dari kamera.");
        }
      });
  }

  initFileInput() {
    document.querySelector("#fileInput")?.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.fileBlob = file;
        alert("Foto berhasil dipilih dari file.");
      } else {
        this.fileBlob = null;
        alert("Silakan pilih file gambar yang valid.");
      }
    });
  }

  initMap() {
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    const map = L.map("map").setView([-6.2, 106.816666], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    let marker = null;
    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      document.querySelector("#lat").value = lat;
      document.querySelector("#lon").value = lng;

      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        marker = L.marker(e.latlng).addTo(map);
      }
    });
  }

  initFormListener() {
    document
      .querySelector("#add-restaurant-form")
      ?.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.querySelector("#name")?.value;
        const description = document.querySelector("#description")?.value;
        const lat = document.querySelector("#lat")?.value;
        const lon = document.querySelector("#lon")?.value;

        const usedPhotoBlob = this.photoBlob || this.fileBlob;

        if (!usedPhotoBlob) {
          alert("Silakan ambil foto dari kamera atau pilih file gambar.");
          return;
        }

        if (!lat || !lon) {
          alert("Silakan pilih lokasi di peta.");
          return;
        }

        this.presenter.addRestaurant({
          name,
          description,
          photo: usedPhotoBlob,
          lat,
          lon,
        });
      });
  }

  initSaveToIndexedDBListener() {
    document.querySelector("#saveToIndexedDB")?.addEventListener("click", async () => {
      const name = document.querySelector("#name")?.value;
      const description = document.querySelector("#description")?.value;
      const lat = document.querySelector("#lat")?.value;
      const lon = document.querySelector("#lon")?.value;

      const usedPhotoBlob = this.photoBlob || this.fileBlob;

      if (!name || !description || !lat || !lon) {
        alert("Semua data dan lokasi harus diisi.");
        return;
      }

      if (!usedPhotoBlob) {
        alert("Silakan ambil atau pilih foto.");
        return;
      }

      try {
        const photoBase64 = await this.convertBlobToBase64(usedPhotoBlob);

        const report = {
          id: +new Date(), // Unique ID
          name,
          description,
          lat: parseFloat(lat),
          lon: parseFloat(lon),
          createdAt: new Date().toISOString(),
          photoUrl: photoBase64,
        };

        await Database.putReport(report);
        alert("Data berhasil disimpan di List Stored!");
      } catch (error) {
        console.error("IndexedDB Error:", error);
        alert("Gagal menyimpan ke IndexedDB.");
      }
    });
  }

  convertBlobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  onSuccessAdd() {
    this.camera?.stop();
    alert("Restoran berhasil ditambahkan!");

    if ("Notification" in window && Notification.permission === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("Restoran Baru Ditambahkan!", {
          body: "Lihat restoran barumu di halaman utama.",
          tag: "new-restaurant",
        });
      });
    }

    navigateTo("#/home");
  }

  onFailedAdd(error) {
    alert("Terjadi kesalahan saat menambahkan restoran.");
    console.error(error);
  }

  async renderTo(container) {
    container.innerHTML = this.getTemplate();
    await this.afterRender();
  }

  async afterRender() {
    await this.initCamera();
    this.initFileInput();
    this.initMap();
    this.initFormListener();
    this.initSaveToIndexedDBListener();
  }
}
