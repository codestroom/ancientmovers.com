import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    // Safari 14 is the oldest iOS that supports most modern JS; targeting it
    // prevents Vite from emitting syntax that crashes older WebKit engines.
    target: ['es2020', 'safari14'],
    // Warn when any individual chunk exceeds 500 KB gzipped
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Static object form avoids circular chunk warnings that the function
        // form can produce when module graphs cross chunk boundaries.
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion': ['framer-motion'],
          'maps': ['leaflet', 'react-leaflet'],
        },
      },
    },
  },
});
