import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward API calls from React to Express backend
      '/admin': 'http://localhost:3000',
      '/trakt': 'http://localhost:3000'
    }
  }
});
