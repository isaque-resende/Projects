import { defineConfig } from 'vite';

// base './' deixa o build funcionar em qualquer pasta/host estático
export default defineConfig({
  base: './',
  build: { target: 'esnext', chunkSizeWarningLimit: 1500 },
});
