<script setup lang="ts">
import { useCookies } from 'vue3-cookies';
import { ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const URL_Backend = import.meta.env.VITE_URL_BACKEND
const router = useRouter();
const route = useRoute();
const id = route.params.id;
const { cookies } = useCookies();
const token = cookies.get('token');

const code = ref('');

axios.get(`${URL_Backend}script?id=${id}`, {
    headers: { 'api-key': `${token}` }
})
    .then(response => {
        code.value = atob(response.data.scripts[0].code);
    })
    .catch(e => {
        console.log(e)
    })

const goBack = () => {
    router.go(-1); // Esta función permite retroceder en el historial del navegador
};
</script>

<template>
    <div class="p-6">
        <button @click="goBack" class="relative bg-gradient-to-r from-green-400 to-blue-500 text-white px-5 py-3 rounded-full shadow-lg mb-4 transition-transform transform hover:scale-105 dark:from-green-600 dark:to-blue-700">
            <span class="relative z-10">⬅ Volver atrás</span>
            <div class="absolute inset-0 bg-white opacity-20 rounded-full blur-lg"></div>
        </button>
        <pre class="bg-white text-black p-4 rounded-lg shadow-lg border border-gray-300 dark:bg-black dark:text-white dark:border-gray-700 overflow-auto transition-all">
            {{ code }}
        </pre>
    </div>
</template>

<style scoped></style>
