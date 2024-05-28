<script setup lang="ts">
import CrearScriptComponent from '@/components/CrearScriptComponent.vue'
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import { useCookies } from 'vue3-cookies'
import { useToast } from 'primevue/usetoast'
import { decodeBase64 } from '@/others/others'

// Ruta del backend desde variables de entorno
const URL_Backend = import.meta.env.VITE_URL_BACKEND

// Obtener token de cookies
const { cookies } = useCookies()
const token: string = cookies.get('token')

// Variables reactivas
const loading = ref<boolean>(true)
const searchQuery = ref<string>('')
const scripts = ref<any[]>([])

// Mostrar notificación de éxito
const toast = useToast()
const showSuccess = (): void => toast.add({ severity: 'success', summary: 'Script creado', detail: 'El script ha sido creado correctamente', life: 3000 })


// Control de modal
const mostrarModal = ref<boolean>(false)
const abrirModal = (): void => { mostrarModal.value = true }
const cerrarModal = (): void => { mostrarModal.value = false }
const controlarEmit = (mssg: string): void => {
  cerrarModal()
  if (mssg == 'ok'){
    showSuccess()
    getScripts()
  }
}

// Obtener scripts del backend
const getScripts = async (): Promise<void> => {
  loading.value = true
  try {
    const response = await axios.get(`${URL_Backend}script`, { headers: { 'api-key': `${token}` } })
    scripts.value = response.data.scripts
    sortScriptsByDate()
    await getUsername()
  } catch (e) {
    console.log(e)
  }
}

// Obtener nombres de usuarios de los scripts
const getUsername = async (): Promise<void> => {
  for (const respuesta of scripts.value) {
    try {
      const response = await axios.get(`${URL_Backend}user?id=${respuesta.idUser}`, { headers: { 'api-key': `${token}` } })
      respuesta.username = response.data.users[0].username
      loading.value = false
    } catch (e) {
      console.log(e)
      loading.value = false
    }
  }
}

// Ordenar scripts por fecha
const sortScriptsByDate = (): void => {
  scripts.value.sort((a, b) => {
    const dateA = new Date(a.dateCreated)
    const dateB = new Date(b.dateCreated)
    return dateB.getTime() - dateA.getTime()
  })
}

// Filtrar scripts
const filteredScripts = computed(() => {
  return scripts.value.filter((script) => {
    return script.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

// Obtener datos al montar el componente
onMounted(() => {
  getScripts()
})
</script>

<template>
  <div v-if="loading" class="loading-overlay">
    <ProgressSpinner />
  </div>
  <div v-else class="container mx-auto p-4">
    <Toast />
    <h1 class="text-3xl font-bold mb-8 text-center text-stone-800 dark:text-stone-300">Scripts de la Comunidad</h1>
    <button @click="abrirModal"
      class="bg-stone-700 dark:bg-stone-200 dark:hover:bg-stone-500 dark:text-stone-800 text-stone-100 px-6 py-3 rounded-md mb-8 hover:bg-opacity-80 block mx-auto">Subir
      Script</button>
    <input v-model="searchQuery" type="text" placeholder="Buscar por título..."
      class="mb-8 px-4 py-2 border border-stone-500 dark:bg-stone-600 dark:text-stone-100 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-stone-800" />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div v-for="script in filteredScripts" :key="script.id"
        class="bg-stone-50 rounded-lg dark:bg-stone-900 shadow-md border border-stone-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
        <RouterLink :to="`/script/${script.id}`" class="block p-6">
          <h2 class="text-lg font-semibold mb-4 dark:text-stone-100">{{ script.title }}</h2>
          <p class="text-stone-500">{{ new Date(script.dateCreated).toLocaleDateString() }}</p>
          <p class="text-stone-500">Creado por {{ script.username }}</p>
          <code
            class="block mt-4 text-stone-600 overflow-hidden whitespace-nowrap overflow-ellipsis">{{ decodeBase64(script.code).split('\n')[0] }}...</code>
        </RouterLink>
      </div>
    </div>
    <CrearScriptComponent v-if="mostrarModal" @cerrar="controlarEmit" />
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
