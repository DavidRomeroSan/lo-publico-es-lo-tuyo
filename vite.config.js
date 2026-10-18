import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// base relativa: funciona en GitHub Pages (subcarpeta) y en un dominio propio
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacidad: resolve(__dirname, 'privacidad.html')
      }
    }
  }
});
