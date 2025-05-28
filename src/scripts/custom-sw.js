import { precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';

// Ini akan memastikan service worker segera mengambil alih setelah aktivasi
self.skipWaiting();
clientsClaim();

self.addEventListener('push', (event) => {
  console.log('Service worker pushing...');

  const title = 'Notifikasi Menu Baru';
  const body = 'Ada Menu Baru di Restaurant Kami!';
  const notificationTag = 'menu-baru-update';

  const options = {
    body: body,
    tag: notificationTag,
    renotify: true,
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
      .catch(error => {
        console.error('Error menampilkan notifikasi:', error);
      })
  );
});

// PENTING: self.__WB_MANIFEST adalah titik injeksi untuk aset yang di-precache
// Biarkan baris ini tidak tersentuh agar workbox bisa menyuntikkan daftar precache.
precacheAndRoute(self.__WB_MANIFEST);

// Anda juga bisa menambahkan event listener untuk 'notificationclick' di sini
self.addEventListener('notificationclick', (event) => {
  event.notification.close(); 

  // Contoh: Buka URL saat notifikasi diklik
  const urlToOpen = event.notification.data?.url || '/'; 
  event.waitUntil(
    clients.openWindow(urlToOpen)
  );
});