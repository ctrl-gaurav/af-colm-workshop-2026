import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/af-colm-workshop-2026/',
  build: {
    outDir: 'build',
  },
});
