import Database from "../../data/database";

export default class ListStoredPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async initialGalleryAndMap() {
    this.#view.showLoading();
    this.#view.showMapLoading();

    try {
      await this.#view.initialMap();

      const storedReports = await this.#model.getAllReports();

      const reportsWithLocalFlag = storedReports.map((report) => ({
        ...report,
        isLocal: true, // untuk tampilkan tombol hapus
      }));

      this.#view.populateReportsList("Berhasil dimuat", reportsWithLocalFlag);
    } catch (error) {
      console.error("Gagal memuat data dari IndexedDB:", error);
      this.#view.populateReportsListError(error.message);
    } finally {
      this.#view.hideMapLoading();
      this.#view.hideLoading();
    }
  }

  async deleteLocalReportById(id) {
    try {
      await Database.removeReport(id);
      const updatedList = await Database.getAllReports();
      this.#view.populateReportsList("Data berhasil dihapus.", updatedList);
    } catch (error) {
      console.error("Gagal menghapus report:", error);
      this.#view.populateReportsListError("Gagal menghapus data.");
    }
  }
}
