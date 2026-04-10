import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0', // 🔥 all network allow
    port: 5173,
    strictPort: true,
    cors: true, // 🔥 allow external requests
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000', // safer than localhost
        changeOrigin: true,
      },
    },
  },
});
