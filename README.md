# ListRestaurant App Starter Project

## Deskripsi
ListRestaurant adalah aplikasi berbasis web yang memungkinkan pengguna untuk melihat, menambahkan, dan mengelola daftar restoran. Aplikasi ini memanfaatkan API eksternal, fitur kamera, lokasi interaktif berbasis peta (Leaflet.js), dan push notification untuk memberikan pengalaman interaktif yang lebih kaya.

Fitur-fitur utama mencakup:

📍 Penentuan lokasi restoran melalui peta interaktif.

📷 Pengambilan gambar langsung dari kamera atau unggahan file.

🔔 Notifikasi push saat restoran berhasil ditambahkan.

🗺️ Penyimpanan koordinat lokasi restoran.

⚙️ Dukungan mode offline dan instalasi sebagai Progressive Web App (PWA).

## Fitur Utama
Tambah Restoran:
    - Isi nama dan deskripsi restoran.
    - Ambil foto menggunakan kamera atau unggah file gambar.
    - Pilih lokasi di peta interaktif (Leaflet.js).
    - Submit dan dapatkan notifikasi bahwa restoran berhasil ditambahkan.

Kamera & Galeri:
    - Mengakses kamera perangkat langsung dari browser.
    - Alternatif unggah foto dari penyimpanan lokal.

Peta Interaktif:
    - Menentukan lokasi dengan klik pada peta.
    - Menyimpan koordinat (latitude & longitude) ke formulir tersembunyi.

Push Notification:
    - Memberikan notifikasi saat restoran baru berhasil ditambahkan.

PWA & Offline Support:
    - Dapat diinstal ke home screen.
    - Data dapat dilihat dan dikelola secara offline melalui IndexedDB.

## Teknologi yang Digunakan
- JavaScript
- Vite
- Leaflet.js
- IndexedDB
- Service Worker
- Web Push Notifications
- Camera API

## Instalasi & Menjalankan Project
1. Clone repositori
    ```bash
    git clone https://github.com/username/listrestaurant-app.git
    cd listrestaurant-app
    ```

2. Install dependensi
    ```bash
    npm install
    ```

3. Jalankan mode development
    ```bash
    npm run dev
    ```

4. Jalankan mode produksi untuk testing    
    ```bash
    npm run build
    npm run preview
    ```
