<script setup lang="ts">
import { useCookies } from 'vue3-cookies';
import { ref, computed, watch } from 'vue';
import axios from 'axios';

const props = defineProps(['numscripts']);
const { cookies } = useCookies();
const token = cookies.get('token');
const idUser = ref<string>('');
const scripts = ref<any[]>([]);
const displayedScripts = ref<any[]>([]);
const nextScriptIndex = ref(0);
const scriptsPerPage = 3;
const photos = ref<any[]>([]);
 // Almacena las fotos obtenidas de la API
// Función para ordenar los scripts por fecha de creación más reciente
const sortScriptsByDate = () => {
  scripts.value.sort((a, b) => {
    const dateA = new Date(a.fecha_creacion);
    const dateB = new Date(b.fecha_creacion);
    return dateB.getTime() - dateA.getTime();
  });
};

const loadMoreScripts = () => {
  const remainingScripts = scripts.value.slice(nextScriptIndex.value, nextScriptIndex.value + scriptsPerPage);
  displayedScripts.value.push(...remainingScripts);
  nextScriptIndex.value += scriptsPerPage;
};

// Esta función verifica si hay más scripts para mostrar
const showLoadMoreButton = computed(() => nextScriptIndex.value < props.numscripts);
watch(scripts, () => {
  nextScriptIndex.value = 0;
  displayedScripts.value = [];
  loadMoreScripts();
});

axios.get(`http://localhost/DWES/CodesnapBackend/user?token=${token}`, { headers: { 'api-key': `${token}` } })
  .then(response => {
    idUser.value = response.data.usuarios[0].id;
    axios.get(`http://localhost/DWES/CodesnapBackend/scripts?idUser=${idUser.value}`, { headers: { 'api-key': `${token}` } })
      .then(response => {
        scripts.value = response.data.scripts;
        sortScriptsByDate();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  })
  .catch(error => {
    console.error('Error:', error);
  });

axios.get(`http://localhost/DWES/CodesnapBackend/user?token=${token}`, { headers: { 'api-key': `${token}` } })
  .then(response => {
    // Obtener el ID del usuario
    const userId = response.data.usuarios[0].id

    // Llamar a la API para obtener las fotos del usuario
    axios.get(`http://localhost/DWES/CodesnapBackend/photos?idUser=${userId}`, { headers: { 'api-key': `${token}` } })
      .then(response => {
        // Almacenar las fotos obtenidas
        photos.value = response.data.photos
      })
      .catch(error => {
        console.error('Error al obtener las fotos:', error);
      });
  })
  .catch(error => {
    console.error('Error al obtener el usuario:', error);
  });

// Formatear el número de likes
const formatLikes = (numLikes: number) => {
  if (numLikes >= 1000) {
    return `${(numLikes / 1000).toFixed(1)}k`;
  } else {
    return numLikes.toString();
  }
}

const eventoClick = () => {
  console.log('eventoClick')
}
const subirFoto=()=>{}
</script>

<template>
  <TabView class="space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 border-t">
    <TabPanel>
      <template #header>
        <div class="flex align-items-center gap-2">
          <i class="pi pi-image text-xl md:text-xs"></i>
          <span class="font-bold white-space-nowrap">posts</span>
        </div>
      </template>
      <div class="m-0">
        <div class="flex flex-wrap -mx-px md:-mx-3">
          <div class="w-1/3 p-px md:px-3">
            <a :href="`#`">
              <article class="post bg-gray-200 text-white relative md:mb-6">
                <!-- Botón para subir foto -->
                <button @click="subirFoto" class="w-full h-full flex justify-center items-center bg-gray-300 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" fill="currentColor" class="bi bi-plus-circle-dotted text-gray-500 text-7xl" viewBox="0 0 16 16">
                    <path d="M8 0q-.264 0-.523.017l.064.998a7 7 0 0 1 .918 0l.064-.998A8 8 0 0 0 8 0M6.44.152q-.52.104-1.012.27l.321.948q.43-.147.884-.237L6.44.153zm4.132.271a8 8 0 0 0-1.011-.27l-.194.98q.453.09.884.237zm1.873.925a8 8 0 0 0-.906-.524l-.443.896q.413.205.793.459zM4.46.824q-.471.233-.905.524l.556.83a7 7 0 0 1 .793-.458zM2.725 1.985q-.394.346-.74.74l.752.66q.303-.345.648-.648zm11.29.74a8 8 0 0 0-.74-.74l-.66.752q.346.303.648.648zm1.161 1.735a8 8 0 0 0-.524-.905l-.83.556q.254.38.458.793zM1.348 3.555q-.292.433-.524.906l.896.443q.205-.413.459-.793zM.423 5.428a8 8 0 0 0-.27 1.011l.98.194q.09-.453.237-.884zM15.848 6.44a8 8 0 0 0-.27-1.012l-.948.321q.147.43.237.884zM.017 7.477a8 8 0 0 0 0 1.046l.998-.064a7 7 0 0 1 0-.918zM16 8a8 8 0 0 0-.017-.523l-.998.064a7 7 0 0 1 0 .918l.998.064A8 8 0 0 0 16 8M.152 9.56q.104.52.27 1.012l.948-.321a7 7 0 0 1-.237-.884l-.98.194zm15.425 1.012q.168-.493.27-1.011l-.98-.194q-.09.453-.237.884zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a7 7 0 0 1-.458-.793zm13.828.905q.292-.434.524-.906l-.896-.443q-.205.413-.459.793zm-12.667.83q.346.394.74.74l.66-.752a7 7 0 0 1-.648-.648zm11.29.74q.394-.346.74-.74l-.752-.66q-.302.346-.648.648zm-1.735 1.161q.471-.233.905-.524l-.556-.83a7 7 0 0 1-.793.458zm-7.985-.524q.434.292.906.524l.443-.896a7 7 0 0 1-.793-.459zm1.873.925q.493.168 1.011.27l.194-.98a7 7 0 0 1-.884-.237zm4.132.271a8 8 0 0 0 1.012-.27l-.321-.948a7 7 0 0 1-.884.237l.194.98zm-2.083.135a8 8 0 0 0 1.046 0l-.064-.998a7 7 0 0 1-.918 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                  </svg>
                </button>
              </article>
            </a>
          </div>
          <!-- Itera sobre cada foto -->
          <div v-for="photo in photos" :key="photo.id" class="w-1/3 p-px md:px-3">
            <a :href="`#`">
              <article class="post bg-gray-100 text-white relative pb-full md:mb-6">
                <!-- Muestra la imagen de la foto -->
                <img class="w-full h-full absolute left-0 top-0 object-cover" :src="photo.foto"
                  :alt="`image-${photo.id}`" @click="eventoClick" />
                <!-- Muestra el número de likes -->
                <div class="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                  <div class="flex justify-center items-center space-x-4 h-full">
                    <span class="p-2">
                      <i class="pi pi-heart"></i>
                      <!-- Si el número de likes supera 1000, muestra '1k' -->
                      {{ formatLikes(photo.numLikes) }}
                    </span>
                  </div>
                </div>
              </article>
            </a>
          </div>
        </div>
      </div>
    </TabPanel>
   <TabPanel>
      <template #header>
        <div class="flex align-items-center gap-2">
          <i class="pi pi-code text-xl md:text-xs"></i>
          <span class="font-bold white-space-nowrap">scripts</span>
        </div>
      </template>
      <div v-if="props.numscripts == 0" class="m-0">No existen scripts actualmente</div>
      <div v-else>
        <ul class="space-y-4">
          <li v-for="(script, index) in displayedScripts" :key="index" class="border border-gray-300 rounded">
            <RouterLink :to="`/onlyScript/${script.id}`" class="block">
              <button class="w-full bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-bold text-xl">{{ script.titulo }}</p>
                    <p class="text-sm text-gray-600">Hecho por {{ script.username }}</p>
                  </div>
                  <p class="text-sm text-gray-600">{{ script.fecha_creacion }}</p>
                </div>
              </button>
            </RouterLink>
          </li>
        </ul>
        <!-- Botón "Mostrar más" -->
        <button v-if="showLoadMoreButton" @click="loadMoreScripts" class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Mostrar más
        </button>
      </div>
    </TabPanel>

    <TabPanel>
      <template #header>
        <div class="flex align-items-center gap-2">
          <i class="pi  pi-comments text-xl md:text-xs"></i>
          <span class="font-bold white-space-nowrap">foros</span>
        </div>
      </template>
      <div class="m-0">No existen foros actualmente</div>
    </TabPanel>
  </TabView>
</template>

<style scoped></style>