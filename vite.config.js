import { defineConfig } from 'vite';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  root: resolve(__dirname, 'src'), 
  publicDir: resolve(__dirname, 'src', 'public'),

  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src', 'index.html'),
        app: resolve(__dirname, 'src/scripts/index.js'),
      },
      output: {
        entryFileNames: ({ name }) => {
          if (name === 'sw') return 'sw.bundle.js';
          if (name === 'app') return 'app.bundle.js';
          return '[name].bundle.js';
        },
        chunkFileNames: '[name].bundle.js',
        assetFileNames: '[name][extname]',
      },
    },
  },
   plugins: [
    VitePWA({ registerType: 'autoUpdate' })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});