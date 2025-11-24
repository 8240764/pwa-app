import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Suppress deprecation warnings from Bootstrap
        silenceDeprecations: ['global-builtin', 'import'],
        quietDeps: true,
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://pwa-backend-2025.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/socket.io': {
        target: 'https://pwa-backend-2025.onrender.com',
        changeOrigin: true,
        secure: false,
        ws: true, // Enable WebSocket proxying
      }
    }
  },
  build: {
    outDir: 'build', // CRA's default build output
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});