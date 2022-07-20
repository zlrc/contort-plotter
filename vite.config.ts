import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

import glsl from 'vite-plugin-glsl';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/variables.scss";`,
      }
    }
  },
  plugins: [vue(), glsl()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL("./src/", import.meta.url)),
    }
  }
});
