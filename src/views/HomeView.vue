<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useCookies } from 'vue3-cookies'
import { decodeBase64 } from '@/others/others'

// Ruta del backend desde variables de entorno
const URL_Backend = import.meta.env.VITE_URL_BACKEND

// Obtener token de cookies
const { cookies } = useCookies()
const token: string = cookies.get('token')

//Variables reactivas
const loading = ref<boolean>(true)
const users = ref<any[]>([])
const forums = ref<any[]>([])
const scripts = ref<any[]>([])
const photos = ref<any[]>([])

// Obtiene los usuarios más recientes
const getUsers = async (): Promise<void> => {
  try {
    const response = await axios.get(`${URL_Backend}user`, { headers: { 'api-key': `${token}` } })
    users.value = response.data.users.sort((a: any, b: any) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()).slice(0, 5)
  } catch (e) {
    console.log(e)
  }
}

// Obtiene los foros más recientes
const getForums = async (): Promise<void> => {
  try {
    const response = await axios.get(`${URL_Backend}forum`, { headers: { 'api-key': `${token}` } })
    forums.value = response.data.forums.sort((a: any, b: any) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()).slice(0, 5)
  } catch (e) {
    console.log(e)
  }
}

// Obtiene los scripts más recientes
const getScripts = async (): Promise<void> => {
  try {
    const response = await axios.get(`${URL_Backend}script`, { headers: { 'api-key': `${token}` } })
    scripts.value = response.data.scripts.sort((a: any, b: any) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()).slice(0, 5)
  } catch (e) {
    console.log(e)
  }
}

// Obtiene las fotos más recientes
const getPhotos = async (): Promise<void> => {
  try {
    const response = await axios.get(`${URL_Backend}photo`, { headers: { 'api-key': `${token}` } })
    photos.value = response.data.photos.slice(0, 4)
    loading.value = false
  } catch (e) {
    console.log(e)
  }
}

// Llama a las funciones de obtención de datos al montar el componente
onMounted(() => {
  getUsers()
  getForums()
  getScripts()
  getPhotos()
})
</script>

<template>
  <div v-if="loading" class="loading-overlay">
    <ProgressSpinner />
  </div>
  <div v-else class="container mx-auto p-4">
    <div class="text-center my-8">
      <h1 class="text-4xl font-bold text-stone-800 dark:text-stone-200">Bienvenido a CodeSnap</h1>
      <p class="text-stone-600 dark:text-stone-400">La red social para programadores</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Users Section -->
      <div class="col-span-1 lg:col-span-3">
        <h2 class="text-2xl font-bold mb-4 text-stone-800 dark:text-stone-200">Usuarios unidos recientemente</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div v-for="user in users" :key="user.id" class="bg-white dark:bg-stone-700 p-4 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold text-stone-800 dark:text-stone-200">{{ user.username }}</h3>
            <p class="text-stone-600 dark:text-stone-400">{{ user.email }}</p>
          </div>
        </div>
      </div>
      <!-- Forums Section -->
      <div class="col-span-1 md:col-span-2 lg:col-span-1">
        <h2 class="text-2xl font-bold mb-4 text-stone-800 dark:text-stone-200">Foros Recientes</h2>
        <div class="bg-white dark:bg-stone-700 p-4 rounded-lg shadow-md">
          <ul>
            <li v-for="forum in forums" :key="forum.id" class="mb-4 pb-2">
              <h3 class="text-xl font-semibold text-stone-800 dark:text-stone-200">{{ forum.title }}</h3>
              <p class="text-stone-600 dark:text-stone-400">{{ forum.question }}</p>
              <p class="text-sm text-stone-500 dark:text-stone-400">Creado por usuario {{ forum.idUser }} el {{ new Date(forum.dateCreated).toLocaleDateString() }}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- Scripts Section -->
      <div class="col-span-1 lg:col-span-1">
        <h2 class="text-2xl font-bold mb-4 text-stone-800 dark:text-stone-200">Scripts Populares</h2>
        <div class="bg-white dark:bg-stone-700 p-4 rounded-lg shadow-md">
          <ul>
            <li v-for="script in scripts" :key="script.id" class="mb-4 pb-2">
              <h3 class="text-xl font-semibold text-stone-800 dark:text-stone-200">{{ script.title }}</h3>
              <pre
                class="bg-stone-100 dark:bg-stone-900 p-2 rounded text-stone-800 dark:text-stone-200">{{ decodeBase64(script.code).split('\n')[0] }}</pre>
              <p class="text-sm text-stone-500 dark:text-stone-400">Creado por usuario {{ script.idUser }} el {{ new Date(script.dateCreated).toLocaleDateString() }}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- Photos Section -->
      <div class="col-span-1 md:col-span-2 lg:col-span-1">
        <h2 class="text-2xl font-bold mb-4 text-stone-800 dark:text-stone-200">Fotos de la Comunidad</h2>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="photo in photos" :key="photo.id" class="col-span-1">
            <div class="relative">
              <img :src="photo.photo" alt="Photo" class="w-full h-auto rounded-lg shadow-md" />
              <div
                class="absolute bottom-0 left-0 bg-black dark:bg-white dark:bg-opacity-50  dark:text-black bg-opacity-50 text-white p-2 rounded-b-lg w-full">
                <p class="text-sm">{{ photo.description }}</p>
                <p class="text-xs">Subido por usuario {{ photo.idUser }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
