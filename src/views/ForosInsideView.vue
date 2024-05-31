<script setup lang="ts">
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter, type RouteLocationNormalizedLoaded, type Router } from 'vue-router'
import { useCookies } from 'vue3-cookies'

// Ruta del backend desde variables de entorno
const URL_Backend = import.meta.env.VITE_URL_BACKEND

// Obtener token de cookies
const { cookies } = useCookies()
const token: string = cookies.get('token')

//Variables
const route:RouteLocationNormalizedLoaded = useRoute()
const router:Router = useRouter()
const lenguage:string|string[] = route.params.lenguaje

//Variables reactivas
const forums = ref<any[]>([])
const searchQuery = ref<string>('')
const loading = ref<boolean>(true)

//Volver atrás
const goBack = (): void => router.go(-1)

//Obtener foros del tipo de lenguaje
const getForums = async (): Promise<void> => {
  try {
    const response = await axios.get(`${URL_Backend}forum?type=${lenguage}`, { headers: { 'api-key': `${token}` } })
    forums.value = response.data.forums.sort((a: any, b: any) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
    loading.value = false
  } catch (e) {
    console.log(e)
    loading.value = false
  }
}

//Filtrar foros que no sean del usuario actual 
const filteredForums = computed(() => {
  return forums.value.filter((foro) => {
    return foro.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

onMounted(() => {
  getForums()
})
</script>

<template>
  <div v-if="loading" class="loading-overlay">
    <ProgressSpinner />
  </div>
  <div v-else class="flex flex-col items-center bg-stone-100 dark:bg-stone-700">
    <header class="top-0 w-full bg-stone-200 dark:bg-stone-800 shadow-md py-4 px-6 z-10">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <h1 class="text-xl font-semibold text-stone-900 dark:text-stone-100 uppercase">FOROS {{ lenguage }}</h1>
        <button @click="goBack"
          class="bg-stone-400 hover:bg-stone-500 text-stone-100 font-semibold mt-4 md:mt-0 py-2 px-4 rounded transition-colors duration-300 ease-in-out">Volver</button>
      </div>
    </header>
    <main class="mt-10 w-full max-w-7xl mx-auto px-6 py-8">
      <div class="flex justify-center mb-8">
        <input v-model="searchQuery" type="text" placeholder="Buscar por título..."
          class="px-4 py-2 border border-stone-300 rounded-md w-full max-w-lg focus:outline-none focus:ring-2 focus:ring-stone-500 dark:bg-stone-700 dark:text-stone-100" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-if="filteredForums.length == 0" class="dark:text-stone-100">No existen foros actualmente</div>
        <div v-else v-for="foro in filteredForums" :key="foro.id"
          class="bg-stone-50 dark:bg-stone-900 shadow-md rounded-lg p-6 transition transform hover:-translate-y-1 hover:shadow-lg">
          <RouterLink :to="`/foro/${foro.id}`"
            class="block border border-stone-200 dark:border-stone-700 rounded-lg p-4 hover:bg-stone-100 dark:hover:bg-stone-800 transition duration-300">
            <h2 class="text-xl font-semibold mb-2 text-stone-900 dark:text-stone-100">{{ foro.title }}</h2>
            <p class="text-stone-500 dark:text-stone-400 text-sm mb-1">Pregunta: {{ foro.question.slice(0, 50) }}...</p>
            <p class="text-stone-500 dark:text-stone-400 text-sm mb-1">Creado el {{ foro.dateCreated }}</p>
            <p class="text-stone-500 dark:text-stone-400 text-sm mb-1">Lenguaje: {{ foro.type }}</p>
            <p class="text-stone-500 dark:text-stone-400 text-sm">Respuestas: {{ foro.numAnswers }}</p>
          </RouterLink>
        </div>
      </div>
    </main>
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
