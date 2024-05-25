<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCookies } from 'vue3-cookies'
import { useRoute, useRouter, type RouteLocationNormalizedLoaded, type Router } from 'vue-router'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'
import { decodeBase64 } from '@/others/others'
import type { ToastServiceMethods } from 'primevue/toastservice'

// Ruta del backend desde variables de entorno
const URL_Backend = import.meta.env.VITE_URL_BACKEND

// Obtener token de cookies
const { cookies } = useCookies()
const token: string = cookies.get('token')

//Variables
const toast: ToastServiceMethods = useToast()
const route: RouteLocationNormalizedLoaded = useRoute()
const router: Router = useRouter()
const id: string | string[] = route.params.id

// Variables reactivas
const loading = ref<boolean>(true)
const dataForum = ref<any>({})
const responseNow = ref<string>('')
const idUser = ref<string>('')
const answers = ref<any[]>([])

const goBack = (): void => router.go(-1)

const showSuccess = (): void => toast.add({ severity: 'success', summary: 'Respuesta enviada', detail: 'Tu respuesta ha sido enviada correctamente', life: 3000 })

// Función para obtener datos del foro desde el backend
const getForum = async (): Promise<void> => {
  try {
    const response = await axios.get(`${URL_Backend}forum?id=${id}`, { headers: { 'api-key': `${token}` } });
    dataForum.value = response.data.forums[0];
  } catch (e) {
    console.log(e);
  }
};

// Función para obtener el ID del usuario desde el backend
const getUserID = async (): Promise<void> => {
  try {
    const response = await axios.get(`${URL_Backend}user?token=${token}`, { headers: { 'api-key': `${token}` } });
    idUser.value = response.data.users[0].id; // Almacena el ID del usuario
  } catch (e) {
    console.log(e);
  }
};

// Función para obtener respuestas del foro desde el backend
const getAnswers = async (): Promise<void> => {
  try {
    const response = await axios.get(`${URL_Backend}answer?idForum=${id}`, { headers: { 'api-key': `${token}` } });
    answers.value = response.data.answers.sort((a: any, b: any) => new Date(b.answerDate).getTime() - new Date(a.answerDate).getTime()); // Ordena las respuestas por fecha
    await getUsernames(); // Obtiene los nombres de usuario
    loading.value = false;
  } catch (e) {
    console.log(e);
    loading.value = false;
  }
};

// Función para enviar una respuesta al foro
const sendResponse = async (): Promise<void> => {
  try {
    if (!responseNow.value || responseNow.value == '') { return; } // Verifica que haya una respuesta
    await axios.post(`${URL_Backend}answer`, {
      idUser: idUser.value,
      idForum: id,
      answer: btoa(responseNow.value)
    }, { headers: { 'api-key': `${token}` } }
    );
    responseNow.value = '';
    showSuccess();
    getAnswers();
  } catch (e) {
    console.log(e);
  }
};

// Función para obtener nombres de usuarios para las respuestas
const getUsernames = async (): Promise<void> => {
  for (const respuesta of answers.value) {
    try {
      const response = await axios.get(`${URL_Backend}user?id=${respuesta.idUser}`, { headers: { 'api-key': `${token}` } });
      respuesta.username = response.data.users[0].username; // Asigna el nombre de usuario a la respuesta
    } catch (e) {
      console.log(e);
    }
  }
};

// Ejecutar funciones al montar el componente
onMounted(() => {
  getAnswers()
  getForum()
  getUserID()
})

</script>

<template>
  <div v-if="loading" class="loading-overlay">
    <ProgressSpinner />
  </div>
  <div v-else class="container mx-auto flex flex-col h-screen">
    <Toast />
    <div class="flex justify-between mb-2 mt-2">
      <h1 class="text-2xl font-bold uppercase dark:text-stone-50">{{ dataForum.title }}</h1>
      <button @click="goBack"
        class="bg-stone-700 hover:bg-stone-600 text-stone-50 font-semibold py-2 px-4 rounded-full focus:outline-none transform transition">
        Volver
      </button>
    </div>
    <div
      class="bg-stone-200 dark:bg-stone-700 border border-stone-500 text-stone-700 dark:text-stone-50 rounded-lg p-2 mb-2 flex flex-col justify-center items-center">
      <div class="text-lg font-semibold">{{ dataForum.question }}</div>
      <div class="text-stone-600 dark:text-stone-300 text-sm mt-1">{{ dataForum.dateCreated }}</div>
    </div>
    <form @submit.prevent="sendResponse" class="mb-4 flex items-center">
      <textarea type="text" v-model="responseNow"
        class="border border-stone-300 dark:border-stone-600 rounded-lg p-2 mr-2 w-3/4 resize-none dark:bg-stone-800 dark:text-stone-50"
        placeholder="Escribe tu respuesta aquí..." rows="1"></textarea>
      <button type="submit" class="bg-stone-500 dark:bg-stone-700 text-stone-50 rounded-lg p-2">Enviar
        respuesta</button>
    </form>
    <div class="overflow-auto mt-6" :style="{ maxHeight: 'calc(80vh - 16rem)' }">
      <div v-for="(answer, index) in answers" :key="index"
        class="respuesta bg-stone-50 dark:bg-stone-700 shadow-md rounded-lg p-4 mb-4 max-w-full">
        <pre class="text-stone-800 dark:text-stone-50 break-all">{{ decodeBase64(answer.answer) }}</pre>
        <div class="text-stone-600 dark:text-stone-300 text-sm mt-1">{{ answer.answerDate }}</div>
        <div class="text-stone-600 dark:text-stone-300 text-sm mt-1">Respuesta de {{ answer.username }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(25, 24, 24, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
