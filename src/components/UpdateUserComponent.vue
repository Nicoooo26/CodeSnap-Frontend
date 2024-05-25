<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCookies } from 'vue3-cookies'
import axios from 'axios'

// Ruta del backend desde variables de entorno
const URL_Backend = import.meta.env.VITE_URL_BACKEND

// Obtener token de cookies
const { cookies } = useCookies()
const token: string = cookies.get('token')

//Creación del emit
const emits = defineEmits(['cerrar'])

const data = ref<any>({})
const id = ref<string>('')
const profilePicture = ref<string | ArrayBuffer | null>('')
const username = ref('')
const birthdate = ref('')
const genre = ref()
const phoneNumber = ref('')
const description = ref('')
const location = ref('')
const fullname = ref('')

// Recoger los datos del usuario
const getDataUsers = async () => {
  try {
    const response = await axios.get(`${URL_Backend}user?token=${token}`, { headers: { 'api-key': `${token}` } })
    data.value = response.data.users[0]
    id.value = data.value.id
    username.value = data.value.username
    profilePicture.value = data.value.profilePicture ? data.value.profilePicture : 'usuario.png'
    birthdate.value = data.value.birthdate
    description.value = data.value.description
    genre.value = data.value.gender
    phoneNumber.value = data.value.phoneNumber
    location.value = data.value.location
    fullname.value = data.value.fullname
  } catch (e) {
    console.log(e)
  }
}

//Actualizar el usuario
const actualizarUser = async () => {
  try {
    await axios.put(`${URL_Backend}user?id=${id.value}`,
      {
        username: username.value,
        birthdate: birthdate.value,
        gender: genre.value ? genre.value : null,
        phoneNumber: phoneNumber.value ? phoneNumber.value : null,
        fullname: fullname.value ? fullname.value : null,
        description: description.value ? description.value : null,
        location: location.value ? location.value : null,
        profilePicture: profilePicture.value != 'usuario.png' ? profilePicture.value : ''
      }, { headers: { 'api-key': `${token}` } })
    emits('cerrar', 'ok')
  } catch (e) {
    console.log(e)
  }
}

//Manejar la subida de imagen
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file: File = (target.files as FileList)[0]
  const reader = new FileReader()
  reader.onloadend = () => {
    // Una vez que se carga la imagen, la guardamos en el estado o la pasamos a la función de actualización del usuario
    profilePicture.value = reader.result
  }
  if (file) {
    reader.readAsDataURL(file) // Leemos el archivo como una URL de datos
  }
}

//Manejar la imagen que aparece
const imageSrc = computed(() => {
  if (typeof profilePicture.value === 'string') {
    return profilePicture.value
  }
  return ''
})

//Eliminar imagen
const deletePhoto = (): void => { profilePicture.value = 'usuario.png' }

onMounted(() => {
  getDataUsers()
})
</script>

<template>
  <div class="modal w-70">
    <div
      class="modal-content transition-all duration-300 ease-in-out bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-50 p-6 rounded-lg shadow-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Editar Perfil</h2>
        <span class="close cursor-pointer" @click="$emit('cerrar')">&times;</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="flex flex-col items-center space-y-4">
          <div class="relative">
            <img class="w-20 h-20 md:w-40 md:h-40 border border-stone-300 dark:border-stone-700 rounded-full p-1"
              :src="imageSrc" alt="profile" />
          </div>
          <div class="flex space-x-4">
            <input type="file" id="fileInput" class="hidden" @change="handleFileUpload"
              accept="image/jpeg, image/png, image/jpg" />
            <label for="fileInput"
              class="px-4 py-2 rounded bg-stone-500 text-stone-50 cursor-pointer hover:bg-stone-600 transition-colors">
              Cambiar foto </label>
            <input type="button" id="borrarFoto" @click="deletePhoto" class="hidden" />
            <label for="borrarFoto"
              class="px-4 py-2 rounded bg-stone-500 text-stone-50 cursor-pointer hover:bg-stone-600 transition-colors">
              Eliminar foto </label>
          </div>
        </div>
        <div class="flex flex-col justify-center space-y-5">
          <input type="text" placeholder="Username"
            class="border border-stone-300 dark:border-stone-700 p-2 rounded w-full h-10 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-50"
            v-model="username" />
          <input type="text" placeholder="Nombre Completo"
            class="border border-stone-300 dark:border-stone-700 p-2 rounded w-full h-10 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-50"
            v-model="fullname" />
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <input type="date" placeholder="Fecha de nacimiento" v-model="birthdate"
          class="border border-stone-300 dark:border-stone-700 p-2 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-50 w-full" />
        <input type="text" placeholder="Ubicación" v-model="location"
          class="border border-stone-300 dark:border-stone-700 p-2 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-50 w-full" />
        <input type="text" placeholder="Teléfono" v-model="phoneNumber"
          class="border border-stone-300 dark:border-stone-700 p-2 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-50 w-full" />
        <select v-model="genre"
          class="border border-stone-300 dark:border-stone-700 p-2 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-50 w-full">
          <option value="0">Masculino</option>
          <option value="1">Femenino</option>
        </select>
      </div>
      <div class="mb-4">
        <textarea placeholder="Descripcion" v-model="description"
          class="border border-stone-300 dark:border-stone-700 p-2 rounded w-full bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-50"></textarea>
      </div>
      <div class="flex justify-end">
        <button type="button" id="theme-toggle"
          class="px-4 py-2 rounded bg-stone-500 text-white hover:bg-stone-600 focus:outline-none transition-colors mr-2 dark:bg-stone-800 dark:hover:bg-stone-700"
          @click="actualizarUser">Guardar cambios</button>
        <button type="button" id="cancelar"
          class="px-4 py-2 rounded bg-stone-500 text-white hover:bg-stone-600 focus:outline-none transition-colors dark:bg-stone-800 dark:hover:bg-stone-700"
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
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  position: relative;
}

.close {
  color: #000000;
  position: absolute;
  font-size: 30px;
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
