import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode.
  const env = loadEnv(mode, process.cwd(), '');
  const isDev = mode === 'development';

  return {
    // Vite plugins used in the project
    plugins: [react()],

    // Tells Vite to use relative paths instead of absolute ones.
    base: '/',

    // Development server configuration
    server: {
      port: 5173,
      host: true,
      proxy: isDev
        ? {
            // Proxy requests for the /admin API path to the backend URL
            '/admin': {
              target: env.VITE_BACKEND_URL || 'http://localhost:3000',
              changeOrigin: true,
            },
            // Proxy requests for the /logout API path
            '/logout': {
              target: env.VITE_BACKEND_URL || 'http://localhost:3000',
              changeOrigin: true,
            },
          }
        : undefined,
    },

    // Build configuration
    build: {
      outDir: 'dist',
    },
  };
});
