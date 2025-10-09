import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@api': resolve(__dirname, './api'),
    },
  },
  build: {
    rollupOptions: {
      external: ['electron'],
      output: {
        format: 'cjs',
        entryFileNames: '[name].cjs',
      },
    },
  },
});
