import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/blog',
  plugins: [react()],
  resolve: {
    alias: {
      components: '/src/components',
      types: '/src/types',
      pages: '/src/pages',
      images: '/src/images',
    },
  },
});
