<script setup lang="ts">
import { ref } from 'vue';
import { defineEmits } from 'vue';

const emits = defineEmits(['cerrar']);
const selectedLanguage = ref('');
const titulo = ref('');
const descripcion = ref('');

const crearForo = () => {
  // Aquí va la lógica
};
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="modal-content bg-white p-6 rounded-md shadow-lg relative">
      <h2 class="text-xl font-semibold mb-4">Crear Foro</h2>
      <span class="close absolute top-2 right-2 text-2xl cursor-pointer hover:text-red-500" @click="emits('cerrar')">&times;</span>

      <form @submit.prevent="crearForo">
        <!-- Selector de lenguaje de programación -->
        <div class="mb-4">
          <label for="lenguaje" class="block text-sm font-medium text-gray-700">Lenguaje de programación</label>
          <select id="lenguaje" v-model="selectedLanguage" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option value="PHP">PHP</option>
            <option value="JAVA">JAVA</option>
            <option value="JAVASCRIPT">JAVASCRIPT</option>
            <option value="C++">C++</option>
            <option value="HTML">HTML</option>
            <option value="SQL">SQL</option>
            <option value="CSS">CSS</option>
            <option value="PHYTON">PHYTON</option>
            <option value="SQL">RUST</option>
          </select>
        </div>
        <!-- Campo de título -->
        <div class="mb-4">
          <label for="titulo" class="block text-sm font-medium text-gray-700">Título</label>
          <input type="text" id="titulo" v-model="titulo" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
        </div>
        <!-- Campo de descripción -->
        <div class="mb-4">
          <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea id="descripcion" v-model="descripcion" rows="3" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors mr-2">Guardar cambios</button>
          <button type="button" class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors" @click="emits('cerrar')">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* No hay estilos en este bloque, ya que se han trasladado a clases de Tailwind CSS */
</style>
