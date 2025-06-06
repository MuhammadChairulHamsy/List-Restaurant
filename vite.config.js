import { defineConfig } from "vite";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "src", "public"),

  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src", "index.html"),
        app: resolve(__dirname, "src/scripts/index.js"),
      },
      output: {
        entryFileNames: ({ name }) => {
          if (name === "sw") return "sw.bundle.js";
          if (name === "app") return "app.bundle.js";
          return "[name].bundle.js";
        },
        chunkFileNames: "[name].bundle.js",
        assetFileNames: "[name][extname]",
      },
    },
  },
  plugins: [
    VitePWA({
      strategies: "injectManifest",
      srcDir: "scripts",
      filename: "custom-sw.js", // nama file SW kamu
      registerType: "autoUpdate",
      manifest: {
        id: "/?source=pwa#/",
        scope: "/",
        start_url: "/?source=pwa#/",
        name: "listRestaurant App",
        short_name: "ListRestaurant",
        description:
          "ListRestaurant adalah aplikasi berbasis web yang memungkinkan pengguna untuk melihat, menambahkan, dan mengelola daftar restoran.",
        display: "standalone",
        background_color: "#FFFFFF",
        theme_color: "#d97706",
        icons: [
          {
            src: "/images/icons/icon-x144.png",
            type: "image/png",
            sizes: "144x144",
            purpose: "any",
          },
          {
            src: "/images/icons/maskable-icon-x48.png",
            type: "image/png",
            sizes: "48x48",
            purpose: "maskable",
          },
          {
            src: "/images/icons/maskable-icon-x96.png",
            type: "image/png",
            sizes: "96x96",
            purpose: "maskable",
          },
          {
            src: "/images/icons/maskable-icon-x192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable",
          },
          {
            src: "/images/icons/maskable-icon-x384.png",
            type: "image/png",
            sizes: "384x384",
            purpose: "maskable",
          },
          {
            src: "/images/icons/maskable-icon-x512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "/images/screenshots/ListRestaurant_001.png",
            sizes: "1366x768",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/images/screenshots/ListRestaurant_002.png",
            sizes: "1366x768",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/images/screenshots/ListRestaurant_003.png",
            sizes: "1366x768",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/images/screenshots/ListRestaurant_004.png",
            sizes: "1366x768",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "/images/screenshots/ListRestaurant_005.png",
            sizes: "1366x768",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "/images/screenshots/ListRestaurant_006.png",
            sizes: "1366x768",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
        shortcuts: [
          {
            name: "List Restaurant Baru",
            short_name: "Baru",
            description: "Membuat list restaurant.",
            url: "/?source=pwa#/new",
            icons: [
              {
                src: "images/icons/add-x512.png",
                type: "image/png",
                sizes: "512x512",
              },
            ],
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
