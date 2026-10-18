import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Both clients use the shared domain modules outside their application folders.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    fs: { allow: ['..'] },
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/ws': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
