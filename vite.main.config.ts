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
      external: ['electron', 'electron-log', 'update-electron-app'],
      output: {
        format: 'cjs',
        entryFileNames: '[name].cjs',
      },
    },
  },
  define: {
    'process.env.KOUDAISAI': JSON.stringify(process.env.KOUDAISAI || 'false'),
  },
});
