<script setup lang="ts">
import CrearScriptComponent from '@/components/CrearScriptComponent.vue';
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { useCookies } from 'vue3-cookies';
import { useToast } from 'primevue/usetoast';
import { decodeBase64 } from '@/others/others';

// Ruta del backend desde variables de entorno
const URL_Backend = import.meta.env.VITE_URL_BACKEND;

// Obtener token de cookies
const { cookies } = useCookies();
const token: string = cookies.get('token');

// Variables reactivas
const id = ref<string>('');
const searchQuery = ref<string>('');
const scripts = ref<any[]>([]);

// Mostrar notificación de éxito
const toast = useToast();
const showSuccess = (): void => {
  toast.add({ severity: 'success', summary: 'Script creado', detail: 'El script ha sido creado correctamente', life: 3000 });
}

// Control de modal
const mostrarModal = ref<boolean>(false);
const abrirModal = (): void => {
  mostrarModal.value = true;
}
const cerrarModal = (): void => {
  mostrarModal.value = false;
}
const controlarEmit = (mssg: string): void => {
  cerrarModal();
  if (mssg == 'ok') {
    showSuccess();
  }
}

// Obtener ID de usuario
const obtenerIdUsuario = (): void => {
  axios.get(`${URL_Backend}user?token=${token}`, { headers: { 'api-key': `${token}` } })
    .then((response) => {
      id.value = response.data.users[0].id;
    })
    .catch((error: Error) => {
      console.error(error);
    });
}

// Obtener scripts del backend
const obtenerScripts = async (): Promise<void> => {
  try {
    const response = await axios.get(`${URL_Backend}script`, {
      headers: { 'api-key':`${token}` }
    });
    scripts.value = response.data.scripts;
    sortScriptsByDate();
  } catch (e) {
    console.log(e);
  }
}

// Ordenar scripts por fecha
const sortScriptsByDate = (): void => {
  scripts.value.sort((a, b) => {
    const dateA = new Date(a.dateCreated);
    const dateB = new Date(b.dateCreated);
    return dateB.getTime() - dateA.getTime();
  });
}

// Filtrar scripts
const filteredScripts = computed(() => {
  return scripts.value.filter((script) => {
    return script.idUser !== id.value && script.title.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

// Obtener datos al montar el componente
onMounted(() => {
  obtenerScripts();
  obtenerIdUsuario();
});

</script>

<template>
  <div class="container mx-auto p-4">
    <Toast />
    <h1 class="text-3xl font-bold mb-8 text-center">Scripts de la Comunidad</h1>
    <button @click="abrirModal"
      class="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-md mb-8 hover:bg-opacity-90 block mx-auto">Subir
      Script</button>
    <input v-model="searchQuery" type="text" placeholder="Buscar por título..."
      class="mb-8 px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div v-for="script in filteredScripts" :key="script.id"
        class="bg-white rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
        <RouterLink :to="`/onlyScript/${script.id}`" class="block p-6">
          <h2 class="text-lg font-semibold mb-4">{{ script.title }}</h2>
          <p class="text-gray-500">{{ new Date(script.dateCreated).toLocaleDateString() }}</p>
          <p class="text-gray-500">Creado por {{ script.username }}</p>
          <code
            class="block mt-4 text-gray-700 overflow-hidden whitespace-nowrap overflow-ellipsis">{{ decodeBase64(script.code).split('\n')[0] }}...</code>
        </RouterLink>
      </div>
    </div>
    <CrearScriptComponent v-if="mostrarModal" @cerrar="controlarEmit" />
  </div>
</template>

<style scoped></style>