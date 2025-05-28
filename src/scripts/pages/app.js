import { getActiveRoute } from "../routes/url-parser";
import {
  generateMainNavigationListTemplate,
  generateAuthenticatedNavigationListTemplate,
  generateSubscribeButtonTemplate,
  generateUnsubscribeButtonTemplate,
  generateUnauthenticatedNavigationListTemplate,
} from "../templates";
import {
  isServiceWorkerAvailable,
  setupSkipToContent,
  transtionHalper,
} from "../utils";
import { getAccessToken, getLogout } from "../utils/auth";
import { resolveRoute } from "../routes/routes";
import {
  isCurrentPushSubscriptionAvailable,
  subscribe,
  unsubscribe,
} from "../utils/notification-helper";

class App {
  #content;
  #drawerButton;
  #navigationDrawer;
  #skipLinkButton;

  constructor({ navigationDrawer, drawerButton, content, skipLinkButton }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;
    this.#skipLinkButton = skipLinkButton;

    this.#init();
  }

  #init() {
    setupSkipToContent(this.#skipLinkButton, this.#content);
    this.#setupDrawer();
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      this.#navigationDrawer.classList.toggle("open");
    });

    document.body.addEventListener("click", (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove("open");
      }

      this.#navigationDrawer.querySelectorAll("a").forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove("open");
        }
      });
    });
  }

  #setupNavigationList() {
    const isLogin = !!getAccessToken();
    const navListMain =
      this.#navigationDrawer.children.namedItem("navlist-main");
    const navList = this.#navigationDrawer.children.namedItem("navlist");

    if (!isLogin) {
      navListMain.innerHTML = "";
      navList.innerHTML = generateUnauthenticatedNavigationListTemplate();
      return;
    }

    navListMain.innerHTML = generateMainNavigationListTemplate();
    navList.innerHTML = generateAuthenticatedNavigationListTemplate();

    const logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (confirm("Apakah Anda yakin ingin keluar?")) {
        getLogout();
        location.hash = "/login";
      }
    });
  }

  async #setupPushNotification() {
    const pushNotificationTools = document.getElementById(
      "push-notification-tools"
    );
    const isSubscribed = await isCurrentPushSubscriptionAvailable();

    if (isSubscribed) {
      pushNotificationTools.innerHTML = generateUnsubscribeButtonTemplate();
      document
        .getElementById("unsubscribe-button")
        .addEventListener("click", () => {
          unsubscribe().finally(() => {
            this.#setupPushNotification();
          });
        });

      return;
    }

    pushNotificationTools.innerHTML = generateSubscribeButtonTemplate();
    document
      .getElementById("subscribe-button")
      .addEventListener("click", () => {
        subscribe().finally(() => {
          this.#setupPushNotification();
        });
      });
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = resolveRoute(url);

    const transition = transtionHalper({
      updateDOM: async () => {
        if (typeof page.renderTo === "function") {
          await page.renderTo(this.#content);
        } else if (typeof page.render === "function") {
          this.#content.innerHTML = await page.render();
          if (typeof page.afterRender === "function") {
            await page.afterRender();
          }
        } else {
          console.error("Page tidak memiliki render atau renderTo method.");
          this.#content.innerHTML = `<section><h1 class="text-2xl font-bold">Invalid Page Component</h1></section>`;
        }
      },
    });

    transition.ready.catch(console.error);
    transition.updateCallbackDone.then(() => {
      scrollTo({ top: 0, behavior: "instant" });
      this.#setupNavigationList();

      if (isServiceWorkerAvailable()) {
        this.#setupPushNotification();
      }
    });
  }
}

export default App;
