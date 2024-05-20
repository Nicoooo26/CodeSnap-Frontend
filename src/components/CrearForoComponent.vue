<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useCookies } from 'vue3-cookies';
import { useToast } from "primevue/usetoast";

const URL_Backend = import.meta.env.VITE_URL_BACKEND
const toast = useToast();

const showWarn = () => {
    toast.add({ severity: 'warn', summary: 'Warning', detail: 'Rellene todos los campos porfavor', life: 3000 });
};

const emits = defineEmits(['cerrar']);
const { cookies } = useCookies();
const token = cookies.get('token');
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
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <Toast />
    <div class="modal-content bg-white p-6 rounded-md shadow-lg relative">
      <h2 class="text-xl font-semibold mb-4">Crear Foro</h2>
      <span class="close absolute top-2 right-2 text-2xl cursor-pointer hover:text-red-500" @click="emits('cerrar')">&times;</span>

      <form @submit.prevent="crearForo">
        <!-- Selector de lenguaje de programación -->
        <div class="mb-4">
          <label for="lenguaje" class="block text-sm font-medium text-gray-700">Lenguaje de programación</label>
          <select id="lenguaje" v-model="tipo" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option value="PHP">PHP</option>
            <option value="JAVA">JAVA</option>
            <option value="JAVASCRIPT">JAVASCRIPT</option>
            <option value="C">C</option>
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
          <label for="descripcion" class="block text-sm font-medium text-gray-700">Pregunta</label>
          <textarea id="descripcion" v-model="pregunta" rows="3" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors mr-2">Guardar cambios</button>
          <button type="button" class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors" @click="emits('cerrar')">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
