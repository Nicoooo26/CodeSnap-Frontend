<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useCookies } from 'vue3-cookies';
import { useToast } from "primevue/usetoast";

// Ruta del backend desde variables de entorno
const URL_Backend = import.meta.env.VITE_URL_BACKEND

// Obtener token de cookies
const { cookies } = useCookies()
const token: string = cookies.get('token')

const toast = useToast();
const showWarn = () => {
    toast.add({ severity: 'warn', summary: 'Warning', detail: 'Rellene todos los campos porfavor', life: 3000 });
};

const emits = defineEmits(['cerrar']);
const tipo = ref('');
const titulo = ref('');
const pregunta = ref('');
const idUser = ref<string>('');

const crearForo = async() => {
  try {
     // Validación de campos
     if (!tipo.value || !titulo.value || !pregunta.value) {
      showWarn()
      return;
    }
    // Realiza el GET para obtener los datos del usuario
    const response = await axios.get(`${URL_Backend}user?token=${token}`, { headers: { 'api-key': `${token}` } });
    const usuario = response.data.users[0];
    idUser.value = usuario.id;
    // Realiza el POST para enviar el script
    await axios.post(`${URL_Backend}forum`, {
      idUser: idUser.value,
      title: titulo.value,
      question: pregunta.value,
      type: tipo.value
    }, { headers: { 'api-key': `${token}` } });
    emits('cerrar', 'ok');
  } catch (error: any) {
    console.error(error);
  }
};

</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-stone-800 bg-opacity-75 dark:bg-stone-950 dark:bg-opacity-75">
    <Toast />
    <div class="modal-content bg-stone-50 dark:bg-stone-900 p-6 rounded-lg shadow-lg relative max-w-md w-full">
      <h2 class="text-2xl font-bold mb-4 text-stone-700 dark:text-stone-200">Crear Foro</h2>
      <span class="close absolute top-2 right-2 text-3xl cursor-pointer hover:text-stone-500 dark:text-stone-100 dark:hover:text-stone-400" @click="emits('cerrar')">&times;</span>
      <form @submit.prevent="crearForo">
        <div class="mb-4">
          <label for="lenguaje" class="block text-sm font-medium text-stone-700 dark:text-stone-300">Lenguaje de programación</label>
          <select id="lenguaje" v-model="tipo" class="mt-1 block w-full py-2 px-3 border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 rounded-md shadow-sm focus:outline-none focus:ring-stone-400 focus:border-stone-400 dark:focus:ring-stone-600 dark:focus:border-stone-600">
            <option value="PHP">PHP</option>
            <option value="JAVA">JAVA</option>
            <option value="JAVASCRIPT">JAVASCRIPT</option>
            <option value="C">C</option>
            <option value="HTML">HTML</option>
            <option value="SQL">SQL</option>
            <option value="CSS">CSS</option>
            <option value="PHYTON">PHYTON</option>
            <option value="RUST">RUST</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="titulo" class="block text-sm font-medium text-stone-700 dark:text-stone-300">Título</label>
          <input type="text" id="titulo" v-model="titulo" class="mt-1 block w-full py-2 px-3 border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 rounded-md shadow-sm focus:outline-none focus:ring-stone-400 focus:border-stone-400 dark:focus:ring-stone-600 dark:focus:border-stone-600">
        </div>
        <div class="mb-4">
          <label for="descripcion" class="block text-sm font-medium text-stone-700 dark:text-stone-300">Pregunta</label>
          <textarea id="descripcion" v-model="pregunta" rows="3" class="mt-1 block w-full py-2 px-3 border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 rounded-md shadow-sm focus:outline-none focus:ring-stone-400 focus:border-stone-400 dark:focus:ring-stone-600 dark:focus:border-stone-600"></textarea>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="px-4 py-2 rounded bg-stone-500 text-stone-50 hover:bg-stone-600 focus:outline-none transition-colors mr-2 dark:bg-stone-600 dark:hover:bg-stone-700">Guardar cambios</button>
          <button type="button" class="px-4 py-2 rounded bg-stone-500 text-stone-50 hover:bg-stone-600 focus:outline-none transition-colors dark:bg-stone-600 dark:hover:bg-stone-700" @click="emits('cerrar')">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>


<style scoped></style>
