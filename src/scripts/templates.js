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

export function generateSubscribeButtonTemplate() {
  return `
    <button id="subscribe-button" class="btn subscribe-button">
      Subscribe <i class="fas fa-bell"></i>
    </button>
  `;
}

export function generateUnsubscribeButtonTemplate() {
  return `
    <button id="unsubscribe-button" class="btn unsubscribe-button">
      Unsubscribe <i class="fas fa-bell-slash"></i>
    </button>
  `;
}