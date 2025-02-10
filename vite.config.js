import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      components: '/src/components',
      storeRedux: '/src/storeRedux',
      pages: '/src/pages',
      hooks: '/src/hooks',
      api: '/src/api',
      features: '/src/features',
      helpers: '/src/helpers',
      images: '/src/images',
    },
  },
});
