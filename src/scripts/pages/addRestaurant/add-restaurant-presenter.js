import { addNewStory } from "../../data/api";

export default class AddRestaurantPresenter {
  constructor(view) {
    this.view = view;
  }

  async addRestaurant({ name, description, photo, lat, lon }) {
    try {
      await addNewStory({
        description: `${name} - ${description}`,
        photo,
        lat,
        lon,
      });

      this.view.onSuccessAdd();
    } catch (error) {
      console.error("Gagal menambah restoran:", error);
      this.view.onFailedAdd(error);
    }
  }
}
