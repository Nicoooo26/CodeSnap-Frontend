<script setup lang="ts">
import CrearForoComponent from '@/components/CrearForoComponent.vue'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

const showSuccess = () => {
  toast.add({ severity: 'success', summary: 'Foro creado', detail: 'El foro ha sido creado correctamente', life: 3000 })
}

const mostrarModal = ref(false)

const abrirModal = () => {
  mostrarModal.value = true
}
const cerrarModal = () => {
  mostrarModal.value = false
}
const controlarEmit = (mssg: string) => {
  cerrarModal()
  if (mssg == 'ok') {
    showSuccess()
  }
}

// Array de foros
const foros = [
  { nombre: 'FORO PHP', imagen: 'programacionIcons/phpIcon.png', link: '/foros/php' },
  { nombre: 'FORO JAVA', imagen: 'programacionIcons/javaIcon.png', link: '/foros/java' },
  { nombre: 'FORO JAVASCRIPT', imagen: 'programacionIcons/jsIcon.png', link: '/foros/javascript' },
  { nombre: 'FORO C', imagen: 'programacionIcons/cIcon.png', link: '/foros/c' },
  { nombre: 'FORO HTML', imagen: 'programacionIcons/htmlIcon.png', link: '/foros/html' },
  { nombre: 'FORO PHYTON', imagen: 'programacionIcons/phytonIcon.png', link: '/foros/phyton' },
  { nombre: 'FORO CSS', imagen: 'programacionIcons/cssIcon.png', link: '/foros/css' },
  { nombre: 'FORO SQL', imagen: 'programacionIcons/sqlIcon.png', link: '/foros/sql' },
  { nombre: 'FORO RUST', imagen: 'programacionIcons/rustIcon.png', link: '/foros/rust' }
]
</script>

<template>
  <div>
    <Toast />
    <div class="flex justify-center">
          <button @click="abrirModal" class="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-bold py-3 px-6 rounded-md mt-5">
            Crear Foro
          </button>
        </div>
    <div class="mb-14 ml-4 mr-4 mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="foro in foros" :key="foro.nombre" class="flex justify-center items-center">
        <div class="max-w-sm bg-stone-50 border border-stone-200 rounded-lg shadow overflow-hidden dark:bg-stone-900 dark:border-stone-700">
          <img class="object-cover w-full h-60" :src="foro.imagen" :alt="foro.nombre" />
          <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-200">{{ foro.nombre }}</h5>
            <RouterLink :to="foro.link">
              <button class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-stone-500 rounded-lg hover:bg-stone-600 focus:ring-4 focus:outline-none focus:ring-stone-300 dark:focus:ring-stone-700">Entrar</button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <CrearForoComponent v-if="mostrarModal" @cerrar="controlarEmit" />
  </div>
</template>

<style scoped></style>
