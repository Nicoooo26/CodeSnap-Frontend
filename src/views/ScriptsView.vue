<script setup lang="ts">
import CrearScriptComponent from '@/components/CrearScriptComponent.vue';
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { useCookies } from 'vue3-cookies';

const mostrarModal = ref(false);
const abrirModal = () => {
  mostrarModal.value = true;
};
const cerrarModal = () => {
  mostrarModal.value = false;
};
const controlarEmit = () => {
  cerrarModal();

};
const id = ref();
const searchQuery = ref('');

const scripts = ref<any[]>([]);
const { cookies } = useCookies();
const token = cookies.get('token');

axios.get(`http://localhost/DWES/CodesnapBackend/user?token=${token}`, { headers: { 'api-key': `${token}` } })
  .then(response => {
    id.value = response.data.usuarios[0].id;
  })
  .catch(error => {
    console.error('Error:', error);
  }
);

const sortScriptsByDate = () => {
  scripts.value.sort((a, b) => {
    const dateA = new Date(a.fecha_creacion);
    const dateB = new Date(b.fecha_creacion);
    return dateB.getTime() - dateA.getTime();
  });
};

const obtenerScripts = async () => {
  try {
    const response = await axios.get('http://localhost/DWES/CodesnapBackend/scripts', {
      headers: { 'api-key': `${token}` }
    });
    scripts.value = response.data.scripts;
    sortScriptsByDate();
  } catch (error) {
    console.error('Error al obtener los scripts:', error);
  }
};

const decodificarBase64 = (cadenaBase64: string) => {
  return atob(cadenaBase64);
};

onMounted(() => {
  obtenerScripts();
});

const filteredScripts = computed(() => {
  return scripts.value.filter(script => {
    return script.idUser !== id.value && script.titulo.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-8 text-center">Scripts de la Comunidad</h1>
    <button @click="abrirModal"
      class="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-md mb-8 hover:bg-opacity-90 block mx-auto">Subir
      Script</button>
    <input v-model="searchQuery" type="text" placeholder="Buscar por título..."
      class="mb-8 px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Iterar sobre los scripts obtenidos -->
      <div v-for="script in filteredScripts" :key="script.id"
        class="bg-white rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
        <RouterLink :to="`/onlyScript/${script.id}`" class="block p-6">
          <h2 class="text-lg font-semibold mb-4">{{ script.titulo }}</h2>
          <p class="text-gray-500">{{ new Date(script.fecha_creacion).toLocaleDateString() }}</p>
          <p class="text-gray-500">Creado por {{ script.username }}</p>
          <code
            class="block mt-4 text-gray-700 overflow-hidden whitespace-nowrap overflow-ellipsis">{{ decodificarBase64(script.code).split('\n')[0] }}...</code>
        </RouterLink>
      </div>
    </div>
    <CrearScriptComponent v-if="mostrarModal" @cerrar="controlarEmit" />
  </div>
</template>



<style scoped></style>
