<script setup lang="ts">
import CrearForoComponent from '@/components/CrearForoComponent.vue'
import { onMounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import axios from 'axios';

// Ruta del backend desde variables de entorno
const URL_Backend = import.meta.env.VITE_URL_BACKEND

//Mostrar Toast 
const toast = useToast()
const showSuccess = (): void => toast.add({ severity: 'success', summary: 'Foro creado', detail: 'El foro ha sido creado correctamente', life: 3000 })

//Controlar Modal
const showModal = ref<boolean>(false)
const openModal = (): void => { showModal.value = true }
const closeModal = (): void => { showModal.value = false }
const controlEmit = (mssg: string): void => {
  closeModal()
  if (mssg == 'ok') showSuccess()

}

//Variables reactivas
const loading = ref<boolean>(true)
const forums = ref()

// Obtiene los foros de la app
const getForumsApp = async (): Promise<void> => {
  try {
    const response = await axios.get(`${URL_Backend}forumsApp`)
    forums.value = response.data.forumsApp
    loading.value = false
  } catch (e) {
    console.log(e)
    loading.value = false
  }
}

onMounted(()=>{
  getForumsApp()
})
</script>

<template>
  <div v-if="loading" class="loading-overlay">
    <ProgressSpinner />
  </div>
  <div v-else>
    <Toast />
    <div class="flex justify-center">
      <button @click="openModal"
        class="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-bold py-3 px-6 rounded-md mt-5">
        Crear Foro
      </button>
    </div>
    <div class="mb-14 ml-4 mr-4 mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="foro in forums" :key="foro.name" class="flex justify-center items-center">
        <div
          class="max-w-sm bg-stone-50 border border-stone-200 rounded-lg shadow overflow-hidden dark:bg-stone-900 dark:border-stone-700">
          <img class="object-cover w-full h-60" :src="foro.imagen" :alt="foro.name" />
          <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-200">FORO {{ foro.name }}</h5>
            <RouterLink :to="foro.link">
              <button
                class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-stone-500 rounded-lg hover:bg-stone-600 focus:ring-4 focus:outline-none focus:ring-stone-300 dark:focus:ring-stone-700">Entrar</button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <CrearForoComponent v-if="showModal" @cerrar="controlEmit" />
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
