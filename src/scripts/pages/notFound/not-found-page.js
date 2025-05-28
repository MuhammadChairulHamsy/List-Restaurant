export default class NotFoundPage {
  getTemplate() {
    return `
      <section class="not-found-page">
        <h1>404 - Halaman Tidak Ditemukan</h1>
        <p>Ups! Alamat yang Anda tuju tidak tersedia.</p>
        <a href="#/">Kembali ke Beranda</a>
      </section>
    `;
  }

  async renderTo(container) {
    container.innerHTML = this.getTemplate();
  }
}
