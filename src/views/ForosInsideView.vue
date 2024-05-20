<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCookies } from 'vue3-cookies';

const URL_Backend = import.meta.env.VITE_URL_BACKEND
const { cookies } = useCookies();
const token = cookies.get('token');
const route = useRoute();
const router = useRouter();

const lenguaje = route.params.lenguaje;
const foros = ref<any[]>([]);
const id = ref();
const searchQuery = ref('');

const goBack = () => {
  router.go(-1);
}

axios.get(`${URL_Backend}user?token=${token}`, { headers: { 'api-key': `${token}` } })
  .then(response => {
    id.value = response.data.users[0].id;
  })
  .catch(e => {
    console.log(e);
  }
);

const obtenerForos = async () => {
  try {
    const response = await axios.get(`${URL_Backend}forum?type=${lenguaje}`, {
      headers: { 'api-key': `${token}` }
    });
    foros.value = response.data.forums.sort((a:any, b:any) =>new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  obtenerForos();
});

const filteredForos = computed(() => {
  return foros.value.filter(foro => {
    return foro.idUser !== id.value && foro.title.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

</script>

<template>
  <div>
    <div class="py-4 px-6 flex flex-col items-center shadow-md">
      <h1 class="text-xl font-semibold text-gray-800 uppercase">FOROS {{ lenguaje }}</h1>
      <button @click="goBack"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold mt-4 py-2 px-4 mb-4 rounded transition-colors duration-300 ease-in-out">Volver</button>
        <input v-model="searchQuery" type="text" placeholder="Buscar por título..."
      class="mb-8 px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500">
    </div>
    <div class="bg-white shadow-md rounded-lg p-6">
    <div v-for="foro in filteredForos" :key="foro.id" class="mb-6">
      <RouterLink :to="`/onlyForo/${foro.id}`" class="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300">
        <h2 class="text-xl font-semibold mb-2">{{ foro.title }}</h2>
        <p class="text-gray-500 text-sm mb-1">Pregunta: {{ (foro.question).slice(0,50)}}...</p>
        <p class="text-gray-500 text-sm mb-1">Creado el {{ foro.dateCreated }}</p>
        <p class="text-gray-500 text-sm mb-1">Lenguaje: {{ foro.type }}</p>
        <p class="text-gray-500 text-sm">Respuestas: {{ foro.numAnswers }} </p>
      </RouterLink>
    </div>
  </div>
  </div>
</template>