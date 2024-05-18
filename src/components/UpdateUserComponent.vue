<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCookies } from 'vue3-cookies';
import axios from 'axios';

const emits = defineEmits(['cerrar'])

const { cookies } = useCookies()
const token = cookies.get('token')
let datos = null
let id: any = null

// Hacer la solicitud utilizando Axios
axios.get(`http://localhost/DWES/CodesnapBackend/user?token=${token}`, { headers: { 'api-key': `${token}` } })
  .then(response => {
    // Manejar la respuesta aquí
    datos = response.data.usuarios[0]
    id = datos.id
    username.value = datos.username
    profilePicture.value = datos.foto ? datos.foto : 'usuario.png'
    fechanacimiento.value = datos.fechanacimiento
    descripcion.value = datos.descripcion
    sexo.value = datos.sexo
    telefono.value = datos.telefono
    ubicacion.value = datos.ubicacion
    nombrecompleto.value = datos.nombrecompleto
  })
  .catch(error => {
    // Manejar errores aquí
    console.error('Error:', error);
  });
const profilePicture = ref<string | ArrayBuffer | null>('');
const username = ref('')
const fechanacimiento = ref('')
const sexo = ref()
const telefono = ref('')
const descripcion = ref('')
const ubicacion = ref('')
const nombrecompleto = ref('')

const actualizarUser = () => {
  console.log(id, username.value, fechanacimiento.value, sexo.value, telefono.value, nombrecompleto.value, descripcion.value, ubicacion.value, profilePicture.value)
  axios.put(`http://localhost/DWES/CodesnapBackend/user?id=${id}`, {
    username: username.value ? username.value : null,
    fechanacimiento: fechanacimiento.value,
    sexo: sexo.value ? sexo.value : null,
    telefono: telefono.value ? telefono.value : null,
    nombrecompleto: nombrecompleto.value ? nombrecompleto.value : null,
    descripcion: descripcion.value ? descripcion.value : null,
    ubicacion: ubicacion.value ? ubicacion.value : null,
    foto: profilePicture.value ? profilePicture.value : null

  }, { headers: { 'api-key': `${token}` } })
    .then(response => {
      emits('cerrar','ok')
    })
    .catch(error => {
      // Manejar errores aquí
      console.error('Error:', error);
    });
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file: File = (target.files as FileList)[0];

  const reader = new FileReader();

  reader.onloadend = () => {
    // Una vez que se carga la imagen, la guardamos en el estado o la pasamos a la función de actualización del usuario
    profilePicture.value = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file); // Leemos el archivo como una URL de datos
  }
};

const imageSrc = computed(() => {
  if (typeof profilePicture.value === 'string') {
    return profilePicture.value;
  }
  // Si profilePicture.value es un ArrayBuffer, lo convertimos a una cadena
  // Si profilePicture.value es null, devolvemos una cadena vacía
  return '';
});
const deletePhoto = () => {
  profilePicture.value = null;
  profilePicture.value = 'usuario.png';
};
</script>

<template>
  <div class="modal w-70">
    <div class="modal-content">
      <h2 class="text-xl font-semibold mb-4">Editar Perfil</h2>
      <span class="close" @click="emits('cerrar')">&times;</span>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="flex flex-col items-center space-y-4">
          <div class="relative">
            <img class="w-20 h-20 md:w-40 md:h-40 border rounded-full p-1" :src="imageSrc" alt="profile" />
          </div>
          <div class="flex space-x-4">
            <input type="file" id="fileInput" class="hidden" @change="handleFileUpload" accept="image/jpeg, image/png, image/jpg" />
            <label for="fileInput"
              class="px-4 py-2 rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-600 focus:outline-none transition-colors">
              Cambiar foto </label>

            <input type="button" id="borrarFoto" @click="deletePhoto" />
            <label for="borrarFoto"
              class="px-4 py-2 rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-600 focus:outline-none transition-colors">
              Eliminar foto </label>
          </div>
        </div>
        <div class="flex flex-col justify-center space-y-5">
          <input type="text" placeholder="Username" class="border p-2 rounded w-full h-10" v-model="username" />
          <input type="text" placeholder="Nombre Completo" class="border p-2 rounded w-full h-10"
            v-model="nombrecompleto" />
        </div>
      </div>
      <div class="flex gap-4 mb-6">
        <input type="date" placeholder="Fecha de nacimiento" v-model="fechanacimiento"
          class="border p-2 rounded w-1/4" />
        <input type="text" placeholder="Ubicación" v-model="ubicacion" class="border p-2 rounded w-1/4" />
        <input type="text" placeholder="Teléfono" v-model="telefono" class="border p-2 rounded w-1/4" />
        <select v-model="sexo" class="border p-2 rounded w-1/4">
          <option value="0">Masculino</option>
          <option value="1">Femenino</option>
        </select>
      </div>
      <div class="mb-4">
        <textarea placeholder="Descripcion" v-model="descripcion" class="border p-2 rounded w-full"></textarea>
      </div>
      <div class="flex justify-end">
        <button type="button" id="theme-toggle"
          class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors mr-2"
          @click="actualizarUser">Guardar cambios</button>
        <button type="button" id="cancelar"
          class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors"
          @click="emits('cerrar')">Cancelar</button>
      </div>
    </div>
  </div>
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
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  position: relative;
  /* Agregamos esta línea */
}

.close {
  color: #000000;
  position: absolute;
  /* Cambiamos a posición absoluta */
  font-size: 30px;
  /* Modificamos el tamaño del icono de cierre */
  cursor: pointer;
  right: 15px;
  /* Lo ubicamos a 15px de la derecha del modal */
  top: 15px;
  /* Lo ubicamos a 15px del borde superior del modal */
}

.close:hover,
.close:focus {
  color: rgb(255, 0, 0);
  text-decoration: none;
  cursor: pointer;
}
</style>