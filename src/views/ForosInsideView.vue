<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import ForosPorLenguajeComponent from '@/components/ForosPorLenguajeComponent.vue';

const route = useRoute();
const router = useRouter();

const lenguaje = route.params.lenguaje;
const tituloBuscado = ref('');

const goBack=()=> {
  router.go(-1);
}
</script>

<template>
    <div class="bg-gray-200 p-4">
      <!-- Botón Atrás -->
      <button @click="goBack" class="absolute top-22 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Atrás
      </button>
      <!-- Título centrado -->
      <h1 class="text-xl font-bold text-center uppercase mb-4">{{ lenguaje }}</h1>
      
      <!-- Formulario de búsqueda -->
      <form class="max-w-md mx-auto">
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Buscar</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span class="pi pi-search"></span>
          </div>
          <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar..." required v-model="tituloBuscado"/>
          <button type="submit" class="text-white absolute top-1/2 transform -translate-y-1/2 right-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
        </div>
      </form>
    </div>
    <ForosPorLenguajeComponent/>
  </template>
  
  