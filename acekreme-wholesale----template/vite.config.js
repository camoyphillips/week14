
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isDev = mode === 'development';

  return {
    plugins: [react()],
    server: {
      port: 5173,
      host: true,
      proxy: isDev
        ? {
            '/admin': {
              target: env.VITE_BACKEND_URL || 'http://localhost:3000',
              changeOrigin: true,
            },

            '/logout': {
              target: env.VITE_BACKEND_URL || 'http://localhost:3000',
              changeOrigin: true,
            },
          }
        : undefined, 
    },

    build: {
      outDir: 'dist', 
    },
  };
});
