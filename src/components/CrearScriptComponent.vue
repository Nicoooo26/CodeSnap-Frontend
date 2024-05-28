<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { useCookies } from 'vue3-cookies'
import { useToast } from 'primevue/usetoast'

// Ruta del backend desde variables de entorno
const URL_Backend = import.meta.env.VITE_URL_BACKEND

// Obtener token de cookies
const { cookies } = useCookies()
const token: string = cookies.get('token')

//Mostrar mensaje emergente
const toast = useToast()
const showWarn = ():void => toast.add({ severity: 'warn', summary: 'Warning', detail: 'Rellene todos los campos porfavor', life: 3000 })

//Definición de emits
const emits = defineEmits(['cerrar'])

//Variables reactivas
const title = ref<string>('')
const file = ref<any>()
const idUser = ref<string>('')
const username = ref<string>('')

//Recoger el file subido 
const handleFileUpload = (event: any) => {
  file.value = event.target.files[0]
}

//Convertir el file en base64 y enviarlo 
const createScript = async () => {
  try {
    if (file.value) {
      const reader = new FileReader()
      reader.onload = () => {
        const codeContent = reader.result as string
        const base64Content = btoa(codeContent)
        sendScript(base64Content)
      }
      reader.readAsText(file.value)
    } else {
      showWarn()
    }
  } catch (e) {
    console.log(e)
  }
}

//Enviar el script a la base de datos
const sendScript = async (base64Content: string) => {
  try {
    // Validación de campos
    if (!title.value || !base64Content) {
      showWarn()
      return
    }
    // Realiza el GET para obtener los datos del usuario
    const response = await axios.get(`${URL_Backend}user?token=${token}`, { headers: { 'api-key': `${token}` } })
    const usuario = response.data.users[0]
    idUser.value = usuario.id
    username.value = usuario.username
    // Realiza el POST para enviar el script
    await axios.post(`${URL_Backend}script`,
      {
        idUser: idUser.value,
        code: base64Content,
        title: title.value
      },
      { headers: { 'api-key': `${token}` } }
    )
    emits('cerrar', 'ok')
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-stone-800 bg-opacity-50 dark:bg-stone-950 dark:bg-opacity-80">
    <Toast />
    <div class="modal-content bg-stone-50 p-6 rounded-md shadow-lg relative dark:bg-stone-900">
      <h2 class="text-xl font-semibold mb-4 text-stone-700 dark:text-stone-200">Insertar Código</h2>
      <span class="close absolute top-2 right-2 text-2xl cursor-pointer dark:text-stone-100 hover:text-stone-500 dark:hover:text-stone-400" @click="emits('cerrar')">&times;</span>
      <form @submit.prevent="createScript" class="max-w-md mx-auto bg-stone-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-stone-900">
        <div class="mb-4">
          <label for="title" class="block text-stone-700 text-sm font-bold mb-2 dark:text-stone-300">Título:</label>
          <input type="text" id="title" v-model="title" class="shadow appearance-none border border-stone-300 rounded w-full py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-stone-800 dark:text-stone-200 dark:border-stone-600" />
        </div>
        <div class="mb-4">
          <label for="file" class="block text-stone-700 text-sm font-bold mb-2 dark:text-stone-300">Archivo:</label>
          <div class="relative">
            <input type="file" id="file" @change="handleFileUpload" class="hidden" accept=".js,.txt,.php,.ts,.sql,.c,.cs,.css,.html,.jsx,.rs" />
            <label for="file" class="cursor-pointer bg-stone-400 hover:bg-stone-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-stone-700 dark:hover:bg-stone-500">
              <span>Seleccionar Archivo</span>
            </label>
            <span class="file-name ml-3 text-stone-700 dark:text-stone-200" v-if="file">{{ file.name }}</span>
          </div>
        </div>
        <button type="submit" class="bg-stone-500 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-stone-600 dark:hover:bg-stone-400">Subir Archivo</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.file-name {
  display: inline-block;
  margin-left: 10px;
}
</style>
