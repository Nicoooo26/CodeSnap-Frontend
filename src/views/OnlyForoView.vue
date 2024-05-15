<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import { useCookies } from 'vue3-cookies';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from "primevue/usetoast";
const toast = useToast();

const route = useRoute();
const router = useRouter();
const { cookies } = useCookies()
const token = cookies.get('token')
const id = route.params.id;
// Datos del foro
const titulo = ref('')
const pregunta = ref('')
const fechaPregunta = ref('')
const respuesta = ref('');
const idUser = ref()

axios.get(`http://localhost/DWES/CodesnapBackend/forums?id=${id}`, { headers: { 'api-key': `${token}` } })
    .then(response => {
        titulo.value = response.data.foros[0].title;
        pregunta.value = response.data.foros[0].question;
        fechaPregunta.value = response.data.foros[0].fecha_creacion;
    })
    .catch(error => {
        console.error('Error:', error);
    }
    );

const volver = () => {
    router.go(-1);
}

axios.get(`http://localhost/DWES/CodesnapBackend/user?token=${token}`, { headers: { 'api-key': `${token}` } })
    .then(response => {
        idUser.value = response.data.usuarios[0].id;
    })
    .catch(error => {
        console.error('Error:', error);
    }
    );

const showSuccess = () => {
    toast.add({ severity: 'success', summary: 'Respuesta enviada', detail: 'Tu respuesta ha sido enviada correctamente', life: 3000 });
};
// Respuestas
const respuestas = ref();
const obtenerRespuestas = async () => {
    try {
        const response = await axios.get(`http://localhost/DWES/CodesnapBackend/answer?idForum=${id}`, {
            headers: { 'api-key': `${token}` }
        });
        respuestas.value = response.data.answers.sort((a: any, b: any) => new Date(b.response_Date).getTime() - new Date(a.response_Date).getTime());
        await obtenerNombresUsuarios();
        console.log(respuestas)
    } catch (error) {
        console.error('Error al obtener los scripts:', error);
    }
};
onMounted(() => {
    obtenerRespuestas();
});
const obtenerNombresUsuarios = async () => {
    for (const respuesta of respuestas.value) {
        try {
            const response = await axios.get(`http://localhost/DWES/CodesnapBackend/user?id=${respuesta.idUser}`, {
                headers: { 'api-key': `${token}` }
            });
            respuesta.username = response.data.usuarios[0].username;
        } catch (error) {
            console.error('Error al obtener el nombre del usuario:', error);
            respuesta.username = 'Usuario desconocido';
        }
    }
};
// Función para enviar respuesta
const enviarRespuesta = async () => {
    try {
        if (!respuesta.value) {
            return
        }
        // Realiza el GET para obtener los datos del usuario
        await axios.post('http://localhost/DWES/CodesnapBackend/answer', {
            idUser: idUser.value,
            idForum: id,
            response: btoa(respuesta.value),
        }, { headers: { 'api-key': `${token}` } });
        respuesta.value = ''
        showSuccess()
        obtenerRespuestas();
    } catch (e: any) {
        console.error(e)
    }
};
const decodificarBase64 = (cadenaBase64: string) => {
    return atob(cadenaBase64);
};
</script>

<template>
    <div class="container mx-auto flex flex-col h-screen">
        <Toast />
        <!-- Título del foro -->
        <div class="flex justify-between mb-2 mt-2">
            <h1 class="text-2xl font-bold uppercase">{{ titulo }}</h1>
            <button @click="volver"
                class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full focus:outline-none transform transition">Volver</button>
        </div>


        <!-- Pregunta -->
        <div class="bg-blue-100 border border-blue-500 text-blue-700 rounded-lg p-2 mb-2 flex flex-col justify-center items-center">
    <div class="text-lg font-semibold">{{ pregunta }}</div>
    <div class="text-gray-600 text-sm mt-1">{{ fechaPregunta }}</div>
</div>


        <!-- Formulario de respuesta -->
        <form @submit.prevent="enviarRespuesta" class="mb-4 flex items-center">
            <textarea type="text" v-model="respuesta"
                class="border border-gray-300 rounded-lg p-2 mr-2 w-3/4 resize-none"
                placeholder="Escribe tu respuesta aquí..." rows="1"></textarea>
            <button type="submit" class="bg-blue-500 text-white rounded-lg p-2">Enviar respuesta</button>
        </form>


        <!-- Respuestas con scrollbar -->
        <div class="overflow-auto h-52">
            <div v-for="(respuesta, index) in respuestas" :key="index"
                class="respuesta bg-white shadow-md rounded-lg p-4 mb-4 max-w-full">
                <pre class="text-gray-800 break-all">{{ decodificarBase64(respuesta.response) }}</pre>
                <div class="text-gray-600 text-sm mt-1">{{ respuesta.response_Date }}</div>
                <div class="text-gray-600 text-sm mt-1">Respuesta de {{  respuesta.username }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>