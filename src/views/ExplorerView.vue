<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useCookies } from 'vue3-cookies'

// Ruta del backend desde variables de entorno
const URL_Backend = import.meta.env.VITE_URL_BACKEND

// Obtener token de cookies
const { cookies } = useCookies()
const token: string = cookies.get('token')

interface User {
  id: string
  username: string
  profilePicture: string
}

const router = useRouter()
const searchQuery = ref('')
const searchResults = ref<User[]>([])
const users = ref<User[]>([])
const hasSearched = ref(false)
const idUserActual = ref('')

const obtenerDatosUser = async (): Promise<void> => {
  try {
    const response = await axios.get(`${URL_Backend}user`, {
      headers: { 'api-key': `${token}` }
    })
    users.value = response.data.users.map((user: any) => ({
      id: user.id,
      username: user.username,
      profilePicture: user.profilePicture?user.profilePicture:'usuario.png'
    }))
  } catch (error) {
    console.log(error)
  }
}
const obtenerIDUserActual = async (): Promise<void> => {
  try {
    const response = await axios.get(`${URL_Backend}user?token=${token}`, {
      headers: { 'api-key': `${token}` }
    })
    idUserActual.value = response.data.users[0].id
  } catch (error) {
    console.log(error)
  }
}
const searchUsers = () => {
  hasSearched.value = true
  searchResults.value = users.value.filter((user) => user.username.toLowerCase().includes(searchQuery.value.toLowerCase()))
}
const goToProfile = (userId: string) => {
  if (idUserActual.value !== userId) {
    router.push({ name: 'profile', params: { id: userId } })
  } else {
    router.push({ name: 'profile' })
  }
}

onMounted(() => {
  obtenerDatosUser()
  obtenerIDUserActual()
})
</script>

<template>
  <div class="flex flex-col items-center justify-start mt-8 bg-stone-200 text-stone-700 p-4">
    <div class="w-full max-w-xl mb-8 text-center">
      <input v-model="searchQuery" type="text" placeholder="Buscar usuario" class="w-3/4 p-3 border border-stone-500 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-stone-800 text-lg" />
      <button @click="searchUsers" class="w-1/4 px-4 py-3 bg-stone-800 dark:bg-stone-400 dark:hover:bg-stone-600 text-white rounded-r-lg hover:bg-stone-700 focus:outline-none focus:bg-stone-700 transition duration-300 ease-in-out text-lg">Buscar</button>
    </div>
    <div v-if="!hasSearched" class="mt-6 w-full max-w-xl text-center text-stone-500">Introduzca el username que desea buscar</div>
    <div v-else class="mt-6 w-full max-w-xl text-center">
      <div v-if="searchResults.length === 0" class="text-red-500">Usuario no encontrado</div>
      <ul v-else class="space-y-4 max-h-96 overflow-y-auto">
        <div v-for="user in searchResults" :key="user.username" @click="goToProfile(user.id)">
          <li class="flex items-center p-4 bg-white rounded-lg shadow cursor-pointer hover:bg-stone-400 transition duration-200 border border-stone-600">
            <img :src="user.profilePicture" alt="Profile Picture" class="w-12 h-12 rounded-full mr-4" />
            <span class="text-lg font-medium">{{ user.username }}</span>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
