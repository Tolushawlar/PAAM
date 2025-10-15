import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://paam.learntoria.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/v1': {
        target: 'https://v1.paamintl.org',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/v1/, '')
      }
    }
  }
})
