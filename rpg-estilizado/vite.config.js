import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// base './' deixa o build funcionar em qualquer pasta/host estático.
// Várias páginas: o jogo (index.html) e os mockups de estilo (mockups/*.html).
const page = (p) => resolve(__dirname, p);
export default defineConfig({
  base: './',
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      input: {
        main: page('index.html'),
        mockups: page('mockups/index.html'),
        tunic: page('mockups/tunic.html'),
        gardens: page('mockups/gardens.html'),
        octopath: page('mockups/octopath.html'),
        vault: page('mockups/vault.html'),
        dissedeus: page('mockups/disse-deus.html'),
      },
    },
  },
});
