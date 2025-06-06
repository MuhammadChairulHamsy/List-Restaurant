import { addNewStory } from "../../data/api";
import Database from "../../data/database";

export default class AddRestaurantPresenter {
  constructor(view) {
    this.view = view;
  }

  async addRestaurant({ name, description, photo, lat, lon, saveToLocalOnly = false }) {
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

    if (saveToLocalOnly) {
      // ⬅️ Simpan hanya ke IndexedDB (tombol simpan)
      try {
        await Database.putReport(restaurantData);
        alert("Data berhasil disimpan secara lokal!");
      } catch (error) {
        console.error("Gagal simpan lokal:", error);
        alert("Gagal menyimpan ke IndexedDB.");
      }
      return;
    }

    // ⬅️ Form submit: kirim ke API, lalu simpan jika gagal
    try {
      await addNewStory({
        description: `${name} - ${description}`,
        photo,
        lat,
        lon,
      });
    } catch (error) {
      console.warn("Gagal kirim ke API, simpan lokal:", error);
      try {
        await Database.putReport(restaurantData);
      } catch (dbError) {
        console.error("Gagal simpan ke IndexedDB:", dbError);
        this.view.onFailedAdd(dbError);
        return;
      }
    }

    this.view.onSuccessAdd();
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
