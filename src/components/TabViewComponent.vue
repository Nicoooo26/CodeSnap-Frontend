<script setup lang="ts">
import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import { ref, computed, watch, onMounted } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();
const { cookies } = useCookies();
const token = cookies.get('token');
const numScripts = ref()
const numForos = ref()
const scripts = ref<any[]>([]);
const displayedScripts = ref<any[]>([]);
const nextScriptIndex = ref(0);
const scriptsPerPage = 2;
const photos = ref<any[]>([]);
<<<<<<< HEAD
// Almacena las fotos obtenidas de la API
=======
const foros = ref<any[]>([]);

>>>>>>> 73f2e22d946980f5713ea24ca93d43ad8b62e986
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
const showLoadMoreButton = computed(() => nextScriptIndex.value < numScripts.value);
watch(scripts, () => {
  nextScriptIndex.value = 0;
  displayedScripts.value = [];
  loadMoreScripts();
});

const obtenerScripts = async () => {
  try {
    await axios.get(`http://localhost/DWES/CodesnapBackend/user?token=${token}`, { headers: { 'api-key': `${token}` } })
      .then(response => {
        const userId = response.data.usuarios[0].id
        numScripts.value = response.data.usuarios[0].numcodigo
        axios.get(`http://localhost/DWES/CodesnapBackend/scripts?idUser=${userId}`, { headers: { 'api-key': `${token}` } })
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
  } catch (e) {
    console.log(e)
  }
}
const obtenerForos = async () => {
  try {
    await axios.get(`http://localhost/DWES/CodesnapBackend/user?token=${token}`, { headers: { 'api-key': `${token}` } })
      .then(response => {
        const userId = response.data.usuarios[0].id
        numForos.value = response.data.usuarios[0].foroscreados
        axios.get(`http://localhost/DWES/CodesnapBackend/forums?idUser=${userId}`, { headers: { 'api-key': `${token}` } })
          .then(response => {
            foros.value = response.data.foros;
          })
          .catch(error => {
            console.error('Error:', error);
          });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } catch (e) {
    console.log(e)
  }
}


const obtenerFotos = async () => {
  await axios.get(`http://localhost/DWES/CodesnapBackend/user?token=${token}`, { headers: { 'api-key': `${token}` } })
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
}
const cargarDatos = async () => {
  await obtenerScripts()
  await obtenerFotos()
  await obtenerForos()
};
onMounted(cargarDatos)
// Formatear el número de likes
const formatLikes = (numLikes: number) => {
  if (numLikes >= 1000) {
    return `${(numLikes / 1000).toFixed(1)}k`;
  } else {
    return numLikes.toString();
  }
}
<<<<<<< HEAD
//------------------------Subir foto-------------------------------
const showModal = ref(false);
const selectedFile = ref(null);
const imagen = ref<string | ArrayBuffer | null>('');
const descripcion = ref('');
=======
const emits = defineEmits(['cerrar'])
const eliminarScript = (idParam: any) => {
  confirm.require({
    message: '¿Deseas eliminar este script?',
    header: 'Confirmación',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Eliminar',
    rejectClass: 'p-button-secondary p-button-outlined',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await axios.delete(`http://localhost/DWES/CodesnapBackend/scripts?id=${idParam}`, { headers: { 'api-key': `${token}` } })
      } catch (e) {
        console.log(e)
      }
      obtenerScripts()
      emits('cerrar')
      toast.add({ severity: 'info', summary: 'Confirmación', detail: 'Script eliminado', life: 3000 });
    },
    reject: () => { }
  });

}
>>>>>>> 73f2e22d946980f5713ea24ca93d43ad8b62e986

const handleFileChange = (event: any) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    imagen.value = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
    selectedFile.value = file;
    showModal.value = true;
  }
};

const imageSrc = computed(() => {
  if (typeof imagen.value === 'string') {
    return imagen.value;
  }
  return '';
});
const SavePhoto = () => {
  console.log(idUser.value, imagen.value, descripcion.value)
  axios.post(`http://localhost/DWES/CodesnapBackend/photos`, {
    idUser: idUser.value,
    foto: imagen.value ? imagen.value : null,
    description: descripcion.value ? descripcion.value : null
  }, { headers: { 'api-key': `${token}` } })
    .then(response => {
      console.log(response);
      showModal.value = false;
      // location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
<<<<<<< HEAD

</script>

<template>
  <input type="file" id="fileInput2" style="display: none" @change="handleFileChange">
=======
const subirFoto = () => { }
</script>

<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
>>>>>>> 73f2e22d946980f5713ea24ca93d43ad8b62e986
  <TabView class="space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 border-t">
    <TabPanel>
      <template #header>
        <div class="flex align-items-center gap-2">
          <i class="pi pi-image text-xl md:text-xs"></i>
          <span class="font-bold white-space-nowrap">posts</span>
        </div>
        <div v-if="showModal" class="modal-container">
          <div class="modal w-11/12 md:w-1/3"> <!-- Ajustamos el tamaño aquí -->
            <div class="modal-content p-4 md:p-6"> <!-- Ajustamos el padding aquí -->
              <h2 class="text-xl font-semibold mb-4">Subir Foto</h2>
              <span class="close" @click="showModal = false">&times;</span>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="flex flex-col items-center space-y-4">
                  <div class="relative mb-4">
                    <img v-if="selectedFile" :src="imageSrc" alt="Foto seleccionada"
                    class="w-full h-auto rounded-lg" />
                    <p v-else class="text-gray-500">Ninguna foto seleccionada</p>
                  </div>
                </div>
                <div class="flex flex-col space-y-4">
                  <textarea placeholder="Descripcion" v-model="descripcion" class="border p-2 rounded w-full h-32"></textarea>
                  <button @click="SavePhoto" class="px-4 py-2 rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-600 focus:outline-none transition-colors">
                    Subir foto
                  </button>
                  <button @click="showModal = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Cerrar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="m-0">
        <div class="flex flex-wrap -mx-px md:-mx-3">
          <div class="w-1/3 p-px md:px-3">
            <a :href="`#`">
              <article class="post bg-gray-200 text-white relative md:mb-6">
<<<<<<< HEAD
                <label for="fileInput2"
                  class="w-full h-full flex justify-center items-center bg-gray-300 rounded-full cursor-pointer">
                  <input type="file" id="fileInput2" style="display: none" @change="handleFileChange">
=======
                <!-- Botón para subir foto -->
                <button @click="subirFoto"
                  class="w-full h-full flex justify-center items-center bg-gray-300 rounded-full">
>>>>>>> 73f2e22d946980f5713ea24ca93d43ad8b62e986
                  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" fill="currentColor"
                    class="bi bi-plus-circle-dotted text-gray-500 text-7xl" viewBox="0 0 16 16">
                    <path
                      d="M8 0q-.264 0-.523.017l.064.998a7 7 0 0 1 .918 0l.064-.998A8 8 0 0 0 8 0M6.44.152q-.52.104-1.012.27l.321.948q.43-.147.884-.237L6.44.153zm4.132.271a8 8 0 0 0-1.011-.27l-.194.98q.453.09.884.237zm1.873.925a8 8 0 0 0-.906-.524l-.443.896q.413.205.793.459zM4.46.824q-.471.233-.905.524l.556.83a7 7 0 0 1 .793-.458zM2.725 1.985q-.394.346-.74.74l.752.66q.303-.345.648-.648zm11.29.74a8 8 0 0 0-.74-.74l-.66.752q.346.303.648.648zm1.161 1.735a8 8 0 0 0-.524-.905l-.83.556q.254.38.458.793zM1.348 3.555q-.292.433-.524.906l.896.443q.205-.413.459-.793zM.423 5.428a8 8 0 0 0-.27 1.011l.98.194q.09-.453.237-.884zM15.848 6.44a8 8 0 0 0-.27-1.012l-.948.321q.147.43.237.884zM.017 7.477a8 8 0 0 0 0 1.046l.998-.064a7 7 0 0 1 0-.918zM16 8a8 8 0 0 0-.017-.523l-.998.064a7 7 0 0 1 0 .918l.998.064A8 8 0 0 0 16 8M.152 9.56q.104.52.27 1.012l.948-.321a7 7 0 0 1-.237-.884l-.98.194zm15.425 1.012q.168-.493.27-1.011l-.98-.194q-.09.453-.237.884zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a7 7 0 0 1-.458-.793zm13.828.905q.292-.434.524-.906l-.896-.443q-.205.413-.459.793zm-12.667.83q.346.394.74.74l.66-.752a7 7 0 0 1-.648-.648zm11.29.74q.394-.346.74-.74l-.752-.66q-.302.346-.648.648zm-1.735 1.161q.471-.233.905-.524l-.556-.83a7 7 0 0 1-.793.458zm-7.985-.524q.434.292.906.524l.443-.896a7 7 0 0 1-.793-.459zm1.873.925q.493.168 1.011.27l.194-.98a7 7 0 0 1-.884-.237zm4.132.271a8 8 0 0 0 1.012-.27l-.321-.948a7 7 0 0 1-.884.237l.194.98zm-2.083.135a8 8 0 0 0 1.046 0l-.064-.998a7 7 0 0 1-.918 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                  </svg>
                </label>
              </article>
            </a>
          </div>
          <!-- Itera sobre cada foto -->
          <div v-for="photo in photos" :key="photo.id" class="w-1/3 p-px md:px-3">
            <router-link :to="{ name: 'instantaneas', params: { id: photo.id }}">
              <article class="post bg-gray-100 text-white relative pb-full md:mb-6">
                <!-- Muestra la imagen de la foto -->
<<<<<<< HEAD
                <img class="w-full h-full absolute left-0 top-0 object-cover" :src="photo.foto" :alt="`image-${photo.id}`" />
=======
                <img class="w-full h-full absolute left-0 top-0 object-cover" :src="photo.foto"
                  :alt="`image-${photo.id}`" @click="eventoClick" />
>>>>>>> 73f2e22d946980f5713ea24ca93d43ad8b62e986
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
            </router-link>
          </div>
        </div>
      </div>
    </TabPanel>
    <TabPanel>
<<<<<<< HEAD
=======

>>>>>>> 73f2e22d946980f5713ea24ca93d43ad8b62e986
      <template #header>
        <div class="flex align-items-center gap-2">
          <i class="pi pi-code text-xl md:text-xs"></i>
          <span class="font-bold white-space-nowrap">scripts</span>
        </div>
      </template>
      <div v-if="numScripts == 0" class="m-0">No existen scripts actualmente</div>
      <div v-else>
        <ul class="space-y-4">
          <li v-for="(script, index) in displayedScripts" :key="index" class="border border-gray-300 rounded">
            <div class="flex items-center justify-between">
              <RouterLink :to="`/onlyScript/${script.id}`" class="flex-1">
                <button
                  class="w-full bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors relative">
                  <div class="flex justify-between items-center">
                    <div>
                      <p class="font-bold text-xl">{{ script.titulo }}</p>
                      <p class="text-sm text-gray-600">Hecho por {{ script.username }}</p>
                    </div>
                    <p class="text-sm text-gray-600">{{ script.fecha_creacion }}</p>
                  </div>
                </button>
              </RouterLink>
              <button @click="eliminarScript(script.id)"
                class="w-16 h-16 text-gray-600 hover:text-red-600 transition-colors pi pi-trash ml-4"></button>
            </div>
          </li>
        </ul>
        <!-- Botón "Mostrar más" -->
        <button v-if="showLoadMoreButton" @click="loadMoreScripts"
          class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Mostrar más
        </button>
      </div>
    </TabPanel>
    <TabPanel>

      <template #header>
        <div class="flex align-items-center gap-2">
          <i class="pi pi-code text-xl md:text-xs"></i>
          <span class="font-bold white-space-nowrap">foros</span>
        </div>
      </template>
      <div v-if="numForos == 0" class="m-0">No existen foros actualmente</div>
      <div v-else>
        <div v-for="(foro, index) in foros" :key="index" class="my-4">
  <div class="rounded-lg shadow-md overflow-hidden bg-white">
    <RouterLink :to="`/onlyForo/${foro.id}`">
      <button class="w-full py-4 px-6 flex justify-between items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-t-lg">
        <div>
          <p class="text-lg font-semibold">{{ foro.title }}</p>
          <p class="text-sm text-gray-200">{{ foro.question.length > 20 ? foro.question.slice(0, 20) + '...' : foro.question }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-200">{{ foro.fecha_creacion }}</p>
          <p class="text-sm text-gray-200">{{ foro.tipo }}</p>
          <p class="text-sm text-gray-200">Numero de respuestas: {{ foro.response_number }}</p>
        </div>
      </button>
    </RouterLink>
    <button @click="eliminarScript(foro.id)" class="w-full py-2 px-6 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-b-lg">
      Eliminar
    </button>
  </div>
</div>


      </div>
    </TabPanel>
  </TabView>
</template>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px; /* Ajuste de padding */
  border-radius: 8px; /* Ajuste de border-radius */
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); /* Ajuste de box-shadow */
  position: relative;
  width: 100%; /* Se ajusta al contenedor padre */
  max-width: 700px; /* Tamaño máximo del modal */
}

.close {
  color: #000000;
  position: absolute;
  font-size: 20px; /* Ajuste de tamaño de fuente */
  cursor: pointer;
  right: 15px;
  top: 15px;
}

.close:hover,
.close:focus {
  color: rgb(255, 0, 0);
  text-decoration: none;
  cursor: pointer;
}
</style>