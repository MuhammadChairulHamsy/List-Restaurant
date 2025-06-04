import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import {
  NetworkFirst,
  CacheFirst,
  StaleWhileRevalidate,
} from "workbox-strategies";

// ❗ Ganti ini dengan BASE_URL yang kamu pakai
const BASE_URL = "https://story-api.dicoding.dev/v1";

// Precache
precacheAndRoute(self.__WB_MANIFEST);

// Runtime caching

// Google Fonts
registerRoute(
  ({ url }) =>
    url.origin === "https://fonts.googleapis.com" ||
    url.origin === "https://fonts.gstatic.com",
  new CacheFirst({
    cacheName: "google-fonts",
  })
);

// FontAwesome CDN
registerRoute(
  ({ url }) =>
    url.origin === "https://cdnjs.cloudflare.com" ||
    url.origin.includes("fontawesome"),
  new CacheFirst({
    cacheName: "fontawesome",
  })
);

// UI Avatars
registerRoute(
  ({ url }) => url.origin === "https://ui-avatars.com",
  new CacheFirst({
    cacheName: "avatars-api",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// API Data (non-image)
registerRoute(
  ({ request, url }) => {
    const base = new URL(BASE_URL);
    return base.origin === url.origin && request.destination !== "image";
  },
  new NetworkFirst({
    cacheName: "list-restaurant-api",
  })
);

// API Image
registerRoute(
  ({ request, url }) => {
    const base = new URL(BASE_URL);
    return base.origin === url.origin && request.destination === "image";
  },
  new StaleWhileRevalidate({
    cacheName: "list-restaurant-api-images",
  })
);

// Maptiler
registerRoute(
  ({ url }) => url.origin.includes("maptiler"),
  new CacheFirst({
    cacheName: "maptiler-api",
  })
);

// Push Notification
self.addEventListener("push", (event) => {
  console.log("Service worker pushing...");

  const title = "Notifikasi Menu Baru";
  const body = "Ada Menu Baru di Restaurant Kami!";
  const notificationTag = "menu-baru-update";

  const options = {
    body,
    tag: notificationTag,
    renotify: true,
  };

  event.waitUntil(
    self.registration.showNotification(title, options).catch((error) => {
      console.error("Error menampilkan notifikasi:", error);
    })
  );
});

// Klik Notifikasi
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || "/";
  event.waitUntil(clients.openWindow(urlToOpen));
});
