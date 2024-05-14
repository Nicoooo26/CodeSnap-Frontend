<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useCookies } from 'vue3-cookies';

const emits = defineEmits(['cerrar']);
const { cookies } = useCookies();
const token = cookies.get('token');
const title = ref('');
let file: File | null = null;
const idUser = ref<string>('');
const username = ref<string>('');
const datos = ref('');

const handleFileUpload = (event: any) => {
    file = event.target.files[0];
};

const crearScript = async () => {
    try {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const codeContent = reader.result as string; 
                const base64Content = btoa(codeContent); 
                enviarScript(base64Content); 
            };
            reader.readAsText(file);
        } else {
            console.error("No se ha seleccionado ningún archivo.");
        }
    } catch (error: any) {
        console.error(error);
    }
};

const enviarScript = async (base64Content: string) => {
    try {
        // Realiza el GET para obtener los datos del usuario
        const response = await axios.get(`http://localhost/DWES/CodesnapBackend/user?token=${token}`, { headers: { 'api-key': `${token}` } });
        const usuario = response.data.usuarios[0];
        idUser.value = usuario.id;
        username.value = usuario.username;
        // Realiza el POST para enviar el script
        const postResponse=await axios.post('http://localhost/DWES/CodesnapBackend/scripts', {
            idUser: idUser.value,
            code: base64Content,
            titulo: title.value,
            username: username.value
        }, { headers: { 'api-key': `${token}` } });
        console.log(username.value)
        console.log("Respuesta del POST:", postResponse.data);
        emits('cerrar');
    } catch (error: any) {
        console.error(error);
    }
};
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="modal-content bg-white p-6 rounded-md shadow-lg relative">
        <h2 class="text-xl font-semibold mb-4">Insertar Código</h2>
        <span class="close absolute top-2 right-2 text-2xl cursor-pointer hover:text-red-500" @click="emits('cerrar')">&times;</span>
        <form @submit.prevent="crearScript" class="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Título:</label>
            <input type="text" id="title" v-model="title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
          </div>
          <div class="mb-4">
            <label for="file" class="block text-gray-700 text-sm font-bold mb-2">Archivo:</label>
            <div class="relative">
              <input type="file" id="file" @change="handleFileUpload" class="hidden" accept=".js,.txt,.php,.ts,.sql" required>
              <label for="file" class="cursor-pointer bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <span>Seleccionar Archivo</span>
              </label>
              <span class="file-name ml-3" v-if="file">{{ file.name }}</span>
            </div>
          </div>
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Subir Archivo
          </button>
        </form>
      </div>
    </div>
  </template>
  