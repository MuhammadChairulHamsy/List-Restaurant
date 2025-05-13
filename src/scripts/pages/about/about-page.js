export default class AboutPage {
  async render() {
    return `
     <section class="about-section">
        <div class="about-container">
          <h1 class="about-title">Tentang Aplikasi Direktori Restoran</h1>
          <p class="about-description">
            Aplikasi Direktori Restoran adalah platform modern yang memudahkan Anda menemukan, menjelajahi, dan menambahkan restoran favorit Anda dari berbagai lokasi.
            Dengan fitur peta interaktif, pengguna dapat dengan mudah menemukan restoran terdekat, melihat ulasan, serta menambahkan restoran baru beserta foto dan lokasi.
          </p>
          <p class="about-description">
            Kami berkomitmen untuk memberikan pengalaman terbaik bagi para pecinta kuliner dan pemilik bisnis restoran agar dapat berkembang di era digital.
            Dengan antarmuka yang ramah pengguna dan teknologi terkini, aplikasi ini memberikan kemudahan dalam menemukan tempat makan yang sempurna untuk setiap kesempatan.
          </p>
          <div class="about-features">
            <h2 class="features-title">Fitur Unggulan:</h2>
            <ul class="features-list">
              <li>📍 Peta Interaktif dengan Marker Lokasi Restoran</li>
              <li>📸 Ambil Foto Langsung atau Upload Galeri</li>
              <li>🔒 Autentikasi Aman & Pengelolaan Data User</li>
              <li>🚀 Performa Cepat dengan Transisi Halus</li>
              <li>🌐 Dukungan Mobile & Desktop (Responsive)</li>
            </ul>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Do your job here
  }
}
