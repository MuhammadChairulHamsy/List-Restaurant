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
        await this.showMap();
  
        const response = await this.#model.getAllStories();
  
        if (!response.ok) {
          console.error("initialGalleryAndMap: API response not OK", response);
          this.#view.populateReportsListError(response.message);
          return;
        }
  
        const list = response.listStory || [];
  
        this.#view.populateReportsList(response.message, list);
      } catch (error) {
        console.error("initialGalleryAndMap: error:", error);
        this.#view.populateReportsListError(error.message);
      } finally {
        this.#view.hideLoading();
      }
    }
  }
  