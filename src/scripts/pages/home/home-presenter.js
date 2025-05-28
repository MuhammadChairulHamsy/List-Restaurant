import Database from "../../data/database";

export default class HomePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async showMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error("showMap: error:", error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async initialGalleryAndMap() {
    this.#view.showLoading();

    try {
      // Tampilkan dan inisialisasi peta
      await this.showMap();

      // Ambil data dari API
      let apiList = [];
      let apiMessage = "";
      try {
        const response = await this.#model.getAllStories();

        if (response.ok) {
          apiList = response.listStory || [];
          apiMessage = response.message;
        } else {
          console.warn("API error:", response.message);
        }
      } catch (error) {
        console.warn("Gagal memuat data dari API:", error);
      }

      // Ambil data dari IndexedDB lokal
      let localList = [];
      try {
        localList = await Database.getAllReports();
      } catch (error) {
        console.warn("Gagal memuat data lokal dari IndexedDB:", error);
      }

      // Gabungkan data dari API dan lokal
      const allReports = [...localList, ...apiList];

      // Tampilkan di UI
      this.#view.populateReportsList(apiMessage, allReports);
    } catch (error) {
      console.error("initialGalleryAndMap: error:", error);
      this.#view.populateReportsListError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }
}
