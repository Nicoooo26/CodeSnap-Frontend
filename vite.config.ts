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
        secure: false, // Esto ignorará los errores de certificados SSL
        changeOrigin: true,
        agent: new https.Agent({  
          rejectUnauthorized: false, // Esto ignorará los certificados no autorizados
        }),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
