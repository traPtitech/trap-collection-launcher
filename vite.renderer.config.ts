import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config
export default defineConfig({
  root: resolve(__dirname, './src/renderer'),
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@api': resolve(__dirname, './api'),
    },
  },
  define: {
    'process.env.KOUDAISAI': JSON.stringify(process.env.KOUDAISAI || 'false'),
  },
  build: {
    outDir: resolve(__dirname, '.vite/renderer/main_window'),
  },
});
