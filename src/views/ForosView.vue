<script setup lang="ts">
import CrearForoComponent from '@/components/CrearForoComponent.vue'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

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

// Array de foros
const forums = [
  { name: 'FORO PHP', imagen: 'programacionIcons/phpIcon.png', link: '/foros/php' },
  { name: 'FORO JAVA', imagen: 'programacionIcons/javaIcon.png', link: '/foros/java' },
  { name: 'FORO JAVASCRIPT', imagen: 'programacionIcons/jsIcon.png', link: '/foros/javascript' },
  { name: 'FORO C', imagen: 'programacionIcons/cIcon.png', link: '/foros/c' },
  { name: 'FORO HTML', imagen: 'programacionIcons/htmlIcon.png', link: '/foros/html' },
  { name: 'FORO PHYTON', imagen: 'programacionIcons/phytonIcon.png', link: '/foros/phyton' },
  { name: 'FORO CSS', imagen: 'programacionIcons/cssIcon.png', link: '/foros/css' },
  { name: 'FORO SQL', imagen: 'programacionIcons/sqlIcon.png', link: '/foros/sql' },
  { name: 'FORO RUST', imagen: 'programacionIcons/rustIcon.png', link: '/foros/rust' }
]
</script>

<template>
  <div>
    <Toast />
    <div class="flex justify-center">
      <button @click="openModal"
        class="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-bold py-3 px-6 rounded-md mt-5">
        Crear Foro
      </button>
    </div>
    <div class="mb-14 ml-4 mr-4 mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="foro in forums" :key="foro.name" class="flex justify-center items-center">
        <div
          class="max-w-sm bg-stone-50 border border-stone-200 rounded-lg shadow overflow-hidden dark:bg-stone-900 dark:border-stone-700">
          <img class="object-cover w-full h-60" :src="foro.imagen" :alt="foro.name" />
          <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-200">{{ foro.name }}</h5>
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

<style scoped></style>
