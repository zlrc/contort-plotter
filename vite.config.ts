import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

import glsl from 'vite-plugin-glsl';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), glsl()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL("./src/", import.meta.url)),
    }
  }
});
