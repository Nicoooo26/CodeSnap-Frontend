import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    proxy: {
      'https://54.205.134.77/CodesnapBackend': {
        target: 'https://54.205.134.77/CodesnapBackend/',
        changeOrigin: true,
        secure: false, // Esto deshabilita la verificación del certificado SSL
        rewrite: (path) => path.replace('https://54.205.134.77/CodesnapBackend/','https://54.205.134.77/CodesnapBackend/'),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
