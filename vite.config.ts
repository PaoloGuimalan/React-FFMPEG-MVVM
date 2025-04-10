/// <reference types="vitest" />

import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc'
import path from 'path';

function crossOriginIsolationMiddleware(_: any, response: any, next: any) {
  response.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  response.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
}

const crossOriginIsolation = () => {
  return {
    name: 'cross-origin-isolation',
    configureServer: (server: any) => {
      server.middlewares.use(crossOriginIsolationMiddleware);
    },
    configurePreviewServer: (server: any) => {
      server.middlewares.use(crossOriginIsolationMiddleware);
    },
  };
};

// https://vite.dev/config/
const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts',
    coverage: {
      provider: 'istanbul',
      reporter: ['text'],
    },
  },
});

// https://vitejs.dev/config/
const viteConfig = defineViteConfig({
  base: '/',
  plugins: [
    react(),
    crossOriginIsolation(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'],
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
});

export default mergeConfig(viteConfig, vitestConfig);

