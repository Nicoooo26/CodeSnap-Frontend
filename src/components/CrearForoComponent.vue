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

//Mensajes emergentes
const toast = useToast();
const showWarn = ():void => toast.add({ severity: 'warn', summary: 'Warning', detail: 'Rellene todos los campos porfavor', life: 3000 });

//Definición de emit
const emits = defineEmits(['cerrar']);

//Variables reactivas
const type = ref<string>('');
const title = ref<string>('');
const question = ref<string>('');
const idUser = ref<string>('');

//Función para crear foros
const createForum = async() => {
  try {
     // Validación de campos
     if (!type.value || !title.value || !question.value) {
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
      title: title.value,
      question: question.value,
      type: type.value
    }, { headers: { 'api-key': `${token}` } });
    emits('cerrar', 'ok');
  } catch (e) {
    console.log(e);
  }
};
const forums = [
  { name: 'PHP', imagen: 'programacionIcons/phpIcon.png', link: '/foros/php' },
  { name: 'JAVA', imagen: 'programacionIcons/javaIcon.png', link: '/foros/java' },
  { name: 'JAVASCRIPT', imagen: 'programacionIcons/jsIcon.png', link: '/foros/javascript' },
  { name: 'C', imagen: 'programacionIcons/cIcon.png', link: '/foros/c' },
  { name: 'HTML', imagen: 'programacionIcons/htmlIcon.png', link: '/foros/html' },
  { name: 'PHYTON', imagen: 'programacionIcons/phytonIcon.png', link: '/foros/phyton' },
  { name: 'CSS', imagen: 'programacionIcons/cssIcon.png', link: '/foros/css' },
  { name: 'SQL', imagen: 'programacionIcons/sqlIcon.png', link: '/foros/sql' },
  { name: 'RUST', imagen: 'programacionIcons/rustIcon.png', link: '/foros/rust' }
]
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-stone-800 bg-opacity-75 dark:bg-stone-950 dark:bg-opacity-75">
    <Toast />
    <div class="modal-content bg-stone-50 dark:bg-stone-900 p-6 rounded-lg shadow-lg relative max-w-md w-full">
      <h2 class="text-2xl font-bold mb-4 text-stone-700 dark:text-stone-200">Crear Foro</h2>
      <span class="close absolute top-2 right-2 text-3xl cursor-pointer hover:text-stone-500 dark:text-stone-100 dark:hover:text-stone-400" @click="emits('cerrar')">&times;</span>
      <form @submit.prevent="createForum">
        <div class="mb-4">
          <label for="lenguaje" class="block text-sm font-medium text-stone-700 dark:text-stone-300">Lenguaje de programación</label>
          <select id="lenguaje" v-model="type" class="mt-1 block w-full py-2 px-3 border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 dark:text-stone-50 rounded-md shadow-sm focus:outline-none focus:ring-stone-400 focus:border-stone-400 dark:focus:ring-stone-600 dark:focus:border-stone-600">
            <option v-for="forum in forums" :key="forum.name" :value="forum.name" class="dark:text-stone-50">
              {{ forum.name }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label for="titulo" class="block text-sm font-medium text-stone-700 dark:text-stone-300">Título</label>
          <input type="text" id="titulo" v-model="title" class="mt-1 block w-full py-2 px-3 border border-stone-300 dark:border-stone-700 dark:text-stone-50 bg-stone-50 dark:bg-stone-800 rounded-md shadow-sm focus:outline-none focus:ring-stone-400 focus:border-stone-400 dark:focus:ring-stone-600 dark:focus:border-stone-600">
        </div>
        <div class="mb-4">
          <label for="descripcion" class="block text-sm font-medium text-stone-700 dark:text-stone-300">Pregunta</label>
          <textarea id="descripcion" v-model="question" rows="3" class="mt-1 block w-full py-2 px-3 border border-stone-300 dark:text-stone-50 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 rounded-md shadow-sm focus:outline-none focus:ring-stone-400 focus:border-stone-400 dark:focus:ring-stone-600 dark:focus:border-stone-600"></textarea>
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
