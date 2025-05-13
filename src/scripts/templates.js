import { showFormattedDate } from "./utils";

// Loader Template
export function generateLoaderTemplate() {
  return `<div class="loader"></div>`;
}

export function generateLoaderAbsoluteTemplate() {
  return `<div class="loader loader-absolute"></div>`;
}

// Navigasi Utama (umum)
export function generateMainNavigationListTemplate() {
  return `
      <li><a id="list-home" href="#/">Home</a></li>
      <li><a id="list-about" href="#/about">About</a></li>
      <li><a id="list-add-restaurant" href="#/addRestaurant">AddRestaurant <i class="fas fa-plus"></i></a></li>
      `;
}

export function generateUnauthenticatedNavigationListTemplate() {
  return `
    <li id="push-notification-tools" class="push-notification-tools"></li>
    <li><a id="login-button" href="#/login">Login</a></li>
    <li><a id="register-button" href="#/register">Register</a></li>
    `;
}

export function generateAuthenticatedNavigationListTemplate() {
  return `
    <li id="push-notification-tools" class="push-notification-tools"></li>
    <li><a id="logout-button" class="logout-button" href="#/logout"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
    `;
}

// export function generateReportsListEmptyTemplate() {
//   return `
//     <div id="reports-list-empty" class="reports-list__empty">
//       <h2>Tidak ada laporan yang tersedia</h2>
//       <p>Saat ini, tidak ada laporan kerusakan fasilitas umum yang dapat ditampilkan.</p>
//     </div>
//   `;
// }

// export function generateReportsListErrorTemplate(message) {
//   return `
//     <div id="reports-list-error" class="reports-list__error">
//       <h2>Terjadi kesalahan pengambilan daftar laporan</h2>
//       <p>${message ? message : 'Gunakan jaringan lain atau laporkan error ini.'}</p>
//     </div>
//   `;
// }

export function generateReportItemTemplate({
  id,
  description,
  photoUrl,
  name,
  createdAt,
  lat,
  lon,
}) {
  return `
  <div tabindex="0" class="report-item" data-reportid="${id}">
    <img class="report-item__image" src="${photoUrl}" alt="${description}">
    <div class="report-item__body">
      <div class="report-item__main">
        <h2 id="report-title" class="report-item__title">${description}</h2>
        <div class="report-item__more-info">
          <div class="report-item__createdat">
            <i class="fas fa-calendar-alt"></i> ${showFormattedDate(createdAt, 'id-ID')}
          </div>
          <div class="report-item__location">
            <i class="fas fa-map"></i> (${lat}, ${lon})
          </div>
        </div>
      </div>
      <div id="report-description" class="report-item__description">
        ${description}
      </div>
      <div class="report-item__more-info">
        <div class="report-item__author">
          Dibuat oleh: ${name}
        </div>
      </div>
    </div>
  </div>
  `;
}