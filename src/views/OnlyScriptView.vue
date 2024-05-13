<script setup lang="ts">
import { useCookies } from 'vue3-cookies';
import { ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const id = route.params.id;
const { cookies } = useCookies();
const token = cookies.get('token');

const code = ref('');

axios.get(`http://localhost/DWES/CodesnapBackend/scripts?id=${id}`, {
    headers: { 'api-key': `${token}` }
})
    .then(response => {
        code.value = atob(response.data.scripts[0].code);
    })
    .catch(error => {
        console.log(error)
    })

const goBack = () => {
    router.go(-1); // Esta función permite retroceder en el historial del navegador
};
</script>

<template>
    <button @click="goBack" class="bg-gray-200 px-3 py-1 rounded-lg mb-4">Volver atrás</button>
    <pre>{{ code }}</pre>
</template>

<style scoped></style>