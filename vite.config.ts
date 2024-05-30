import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import https from 'https' // Importa el módulo https

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    proxy: {
      '/CodesnapBackend': {
        target: 'https://54.205.134.77',
        secure:false,
        changeOrigin: true,
        // Reemplaza `agent` con `followRedirects` para evitar errores de redirección
        followRedirects: true,
        // Agrega un encabezado `host` para la solicitud
        headers: {
          host: '54.205.134.77',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
