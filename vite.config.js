import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, 'src'),  // Akar proyek = src
  publicDir: resolve(__dirname, 'src', 'public'),

  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // Entry utama = index.html (karena root = src, cukup pakai path relatif)
        main: resolve(__dirname, 'src', 'index.html'),
        app: resolve(__dirname, 'src/scripts/index.js'),
        sw: resolve(__dirname, 'src/scripts/sw.js'),
      },
      output: {
        entryFileNames: ({ name }) => {
          if (name === 'sw') return 'sw.bundle.js';
          if (name === 'app') return 'app.bundle.js';
          return '[name].bundle.js'; // biasanya jadi main.bundle.js
        },
        chunkFileNames: '[name].bundle.js',
        assetFileNames: '[name][extname]',
      },
    },
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
