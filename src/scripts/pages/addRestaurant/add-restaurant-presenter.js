import { addNewStory } from "../../data/api";
import Database from "../../data/database";

export default class AddRestaurantPresenter {
  constructor(view) {
    this.view = view;
  }

  async addRestaurant({ name, description, photo, lat, lon }) {
    const id = `${Date.now()}-${Math.random()}`;
    const photoBase64 = await this.#convertBlobToBase64(photo);

    const restaurantData = {
      id,
      name,
      description,
      photoUrl: photoBase64,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      createdAt: new Date().toISOString(),
    };

    try {
      // Simpan ke API (jika online)
      await addNewStory({
        description: `${name} - ${description}`,
        photo,
        lat,
        lon,
      });
    } catch (error) {
      console.warn("Gagal mengirim ke API, lanjut simpan ke lokal:", error);
    }

    try {
      // Selalu simpan ke IndexedDB
      await Database.putReport(restaurantData);
      this.view.onSuccessAdd();
    } catch (dbError) {
      console.error("Gagal simpan ke IndexedDB:", dbError);
      this.view.onFailedAdd(dbError);
    }
  }

 #convertBlobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

}
