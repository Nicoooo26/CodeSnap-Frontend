<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useCookies } from 'vue3-cookies';

const emits = defineEmits(['cerrar']);
const {cookies} = useCookies()
const token = cookies.get('token')
const title = ref('');
let file: File | null = null;
let fileContent: string | null = null;

const handleFileUpload = (event: any) => {
    file = event.target.files[0];
};

const crearScript = async () => {
    try {
        await axios.post('http://localhost/DWES/CodesnapBackend/CodeSnapBackEnd/scripts', {
            idUser: 4,
            code: 'vale',
            titulo: title.value,
        },{headers:{'api-key':`${token}`} });
    } catch (error: any) {
        console.error(error);
    }
   
};

const enviarContenido = async () => {
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            fileContent = reader.result as string;
            enviarContenido();
        };
        reader.readAsText(file);
    }
};
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="modal-content bg-white p-6 rounded-md shadow-lg relative">
            <h2 class="text-xl font-semibold mb-4">Insertar Código</h2>
            <span class="close absolute top-2 right-2 text-2xl cursor-pointer hover:text-red-500"
                @click="emits('cerrar')">&times;</span>
            <form @submit.prevent="crearScript" class="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Título:</label>
                    <input type="text" id="title" v-model="title"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="file" class="block text-gray-700 text-sm font-bold mb-2">Archivo:</label>
                    <input type="file" id="file" @change="handleFileUpload"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        accept=".js,.txt,.php,.ts,.sql">
                </div>
                <button type="submit"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Subir
                    Archivo</button>
            </form>
        </div>
    </div>
</template>
