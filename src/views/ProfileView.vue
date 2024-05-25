<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import TabViewComponent from '@/components/TabViewComponent.vue'
import UpdateUserComponent from '@/components/UpdateUserComponent.vue'
import { useCookies } from 'vue3-cookies'
import axios from 'axios'
import { useRoute } from 'vue-router'

// Ruta del backend desde variables de entorno
const URL_Backend = import.meta.env.VITE_URL_BACKEND

// Obtener token de cookies
const { cookies } = useCookies()
const token: string = cookies.get('token')

// Variables reactivas
const showModal = ref<boolean>(false)
const data = ref<any>({})
const loading = ref<boolean>(true)

// Funciones de manipulación del modal
const openModal = () => (showModal.value = true)
const closeModal = () => (showModal.value = false)
const emitControl = (mssg: string) => {
  closeModal()
  if (mssg === 'ok') {
    loading.value = true
    getDataUser()
  }
}

// Calculados
const route = useRoute()
const isCurrentUser = computed(() => !route.params.id) // Indica si es el usuario actual
const userId = computed(() => route.params.id as string | undefined) // ID del usuario

// Obtiene los datos del usuario
const getDataUser = async (userId?: string): Promise<void> => {
  try {
    const endpoint = userId ? `${URL_Backend}user?id=${userId}` : `${URL_Backend}user?token=${token}`
    const response = await axios.get(endpoint, { headers: { 'api-key': `${token}` } })
    data.value = response.data.users[0]
    // Si no hay imagen de perfil, usa una por defecto
    data.value.profilePicture = data.value.profilePicture ? data.value.profilePicture : '/FCTProject/public/usuario.png'
    loading.value = false 
  } catch (e) {
    console.log(e) 
    loading.value = false 
  }
}

// Se ejecuta al montar el componente
onMounted(() => {
  loading.value = true 
  const userId = route.params.id as string | undefined
  getDataUser(userId) // Obtiene los datos del usuario
})

// Observa cambios en el ID del usuario
watch(
  () => route.params.id,
  (newId: any) => {
    loading.value = true 
    getDataUser(newId) // Obtiene los datos del usuario
  }
)
</script>

<template>
  <div>
    <main class="bg-stone-200 dark:bg-stone-800 mt-6 bg-opacity-25 dark:bg-opacity-25">
      <div class="lg:w-8/12 lg:mx-auto">
        <header class="flex flex-wrap items-center p-4 md:py-2">
          <div class="md:w-3/12 md:ml-16">
            <img class="w-20 h-20 md:w-40 md:h-40 object-cover border dark:bg-stone-100 border-stone-300 dark:border-stone-600 rounded-full p-1" :src="data.profilePicture" alt="profile" />
          </div>
          <div class="w-8/12 md:w-7/12 ml-4">
            <div class="md:flex md:flex-wrap md:items-center mb-4">
              <h2 class="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0 dark:text-stone-50">{{ data.username }}</h2>
              <span class="inline-block fas fa-certificate fa-lg text-stone-500 relative mr-6 text-xl transform -translate-y-2" aria-hidden="true">
                <i class="fas fa-check text-stone-50 text-xs absolute inset-x-0 ml-1 mt-px"></i>
              </span>
              <Button v-if="isCurrentUser" label="Editar perfil" class="bg-stone-500 dark:bg-stone-700 px-2 py-1 text-stone-50 font-semibold text-sm rounded text-center sm:inline-block block" @click="openModal" />
            </div>
            <ul class="hidden md:flex space-x-8 mb-4">
              <li class="text-stone-800 dark:text-stone-50">
                <span class="font-semibold">{{ data.numPhotos }}</span>
                posts
              </li>
              <li class="text-stone-800 dark:text-stone-50">
                <span class="font-semibold">{{ data.numCodes }}</span>
                scripts
              </li>
              <li class="text-stone-800 dark:text-stone-50">
                <span class="font-semibold">{{ data.numForums }}</span>
                foros
              </li>
            </ul>
            <div class="hidden md:block text-stone-800 dark:text-stone-50">
              <h1 class="font-semibold">{{ data.fullname }}</h1>
              <p class="text-stone-400 dark:text-stone-300">{{ `En CodeSnap desde el ${data.dateCreated}` }}</p>
              <span class="underline">{{ data.location }}</span>
              <p v-if="data.birthdate !== '0000-00-00'">Este usuario nació en {{ data.birthdate }}</p>
              <p>{{ data.description }}</p>
            </div>
          </div>
          <div class="md:hidden text-sm my-2 text-stone-800 dark:text-stone-50">
            <h1 class="font-semibold">{{ data.fullname }}</h1>
            <p class="text-stone-400 dark:text-stone-300">{{ `En CodeSnap desde el ${data.dateCreated}` }}</p>
            <span class="underline">{{ data.location }}</span>
            <p>Este usuario nació en {{ data.birthdate }}</p>
            <p>{{ data.description }}</p>
          </div>
        </header>
        <div class="px-px md:px-3">
          <ul class="flex md:hidden justify-around space-x-8 border-t border-stone-300 dark:border-stone-600 text-center p-2 text-stone-600 dark:text-stone-300 leading-snug text-sm">
            <li>
              <span class="font-semibold text-stone-800 dark:text-stone-50 block">{{ data.numPhotos }}</span>
              posts
            </li>
            <li>
              <span class="font-semibold text-stone-800 dark:text-stone-50 block">{{ data.numCodes }}</span>
              scripts
            </li>
            <li>
              <span class="font-semibold text-stone-800 dark:text-stone-50 block">{{ data.numForums }}</span>
              foros
            </li>
          </ul>
          <TabViewComponent @cerrar="getDataUser" v-bind="userId && { userId }" :numScripts="data.numCodes" :numPhotos="data.numPhotos" :numForums="data.numForums" />
        </div>
      </div>
    </main>
    <UpdateUserComponent v-if="showModal" @cerrar="emitControl" />
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
