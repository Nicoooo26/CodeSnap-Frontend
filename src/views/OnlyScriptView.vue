<script setup lang="ts">
import { useCookies } from 'vue3-cookies'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

// Ruta del backend desde variables de entorno
const URL_Backend = import.meta.env.VITE_URL_BACKEND

// Obtener token de cookies
const { cookies } = useCookies()
const token: string = cookies.get('token')

// Definición de tipos para las constantes
const router = useRouter()
const route = useRoute()
const id: string | string[] = route.params.id
const loading = ref(true)
const code = ref('')

// Función para obtener el código desde el backend
const getCode = async (): Promise<void> => {
  try {
    // Petición al backend para obtener el script
    const response = await axios.get(`${URL_Backend}script?id=${id}`, {
      headers: { 'api-key': `${token}` }
    })
    // Decodificación del script base64
    code.value = atob(response.data.scripts[0].code)
    loading.value = false
  } catch (e) {
    console.log(e)
    loading.value = false
  }
}

// Ejecutar getCode al montar el componente
onMounted(getCode)

// Función para regresar a la página anterior
const goBack = (): void => {
  router.go(-1)
}
</script>

<template>
  <div class="p-6">
    <button @click="goBack" class="relative bg-gradient-to-r from-stone-400 to-stone-500 text-white px-5 py-3 rounded-full shadow-lg mb-4 transition-transform transform hover:scale-105 dark:from-stone-600 dark:to-stone-700">
      <span class="relative z-10">Volver atrás</span>
      <div class="absolute inset-0 bg-white opacity-20 rounded-full blur-lg"></div>
    </button>
    <pre class="bg-stone-50 text-stone-900 p-4 rounded-lg shadow-lg border border-stone-300 dark:bg-stone-900 dark:text-stone-200 dark:border-stone-700 overflow-auto transition-all">
      {{ code }}
    </pre>
    <div v-if="loading" class="loading-overlay">
      <ProgressSpinner />
    </div>
  </div>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(25, 24, 24, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
