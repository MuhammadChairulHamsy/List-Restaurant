import { getAccessToken } from "../utils/auth";
import CONFIG from "../config";


const ENDPOINTS = {
  // Auth
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,

  RESTAURANT: `${CONFIG.BASE_URL}/stories`,
  ADDRESTAURANTS: `${CONFIG.BASE_URL}/stories`,
};

export async function getRegistered({ name, email, password }) {
  const data = JSON.stringify({ name, email, password });

  const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getLogin({ email, password }) {
  const data = JSON.stringify({ email, password });

  const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getAllStories() {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.RESTAURANT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function addNewStory({
  description,
  photo,
  lat,
  lon,
}) {
  const accessToken = getAccessToken();

  const formData = new FormData();
  formData.set("description", description);
  formData.set("lat", lat);
  formData.set("lon", lon);

  if (Array.isArray(photo)) {
    photo.forEach((p) => {
      formData.append("photo", p);
    });
  } else if (photo instanceof Blob) {
    // Jika hanya satu photo berbentuk Blob (contohnya dari kamera)
    formData.append("photo", photo);
  } else {
    throw new Error("Foto tidak valid. Pastikan foto dalam bentuk File, Blob, atau Array.");
  }

  try {
    const response = await fetch("https://story-api.dicoding.dev/v1/stories", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error("API Error body:", errorBody);
      throw new Error(`Gagal tambah data: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("addNewStory error:", error);
    throw error;
  }
}


export async function addNewStoryGuestAccount({
  description,
  photo,
  lat,
  lon,
}) {
  const accessToken = getAccessToken();

  const formData = new FormData();
  formData.set('description', description);
  formData.set('lat', lat);
  formData.set('lon', lon);
  photo.forEach((photos) => {
    formData.append('photo', photos);
  });
}


// const TOKEN =
//   "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk.eyJ1aWQiOiJkZW1vX3VzZXIiLCJpYXQiOjE2Njg4MDgwMDB9.6rFwQhdAYlVkHX5FVFqhGLelaxFC1kMtFfTxmGlQsbs";



