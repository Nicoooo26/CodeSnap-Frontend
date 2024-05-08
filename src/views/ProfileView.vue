<script setup lang="ts">
import { ref } from 'vue'
import TabViewComponent from '@/components/TabViewComponent.vue'
import DialogComponent from '@/components/DialogComponent.vue'
import { useTokenStore } from '@/storage/store';
import axios from 'axios';

const mostrarModal = ref(false)

const abrirModal = () => {
  mostrarModal.value = true
}
const cerrarModal = () => {
  mostrarModal.value = false
}
const controlarEmit = () => {
  cerrarModal()
}

const storeToken = useTokenStore()
const token = storeToken.getToken
let datos =null

// Hacer la solicitud utilizando Axios
axios.get(`http://localhost/DWES/CodesnapBackend/CodeSnapBackEnd/user?token=${token}`, {headers:{'api-key':`${token}`} })
  .then(response => {
    // Manejar la respuesta aquí
    datos=response.data.usuarios[0]
    username.value = datos.username
    profilePicture.value=datos.foto?datos.foto:'usuario.png'
    fechaNacimiento.value = datos.fechanacimiento
    description.value = datos.descripcion
    gender.value=datos.sexo
    phoneNumber.value = datos.telefono
    joinDate.value = `En CodeSnap desde el ${datos.fecha_ingreso}`
    location.value=datos.ubicacion
    fullName.value=datos.nombrecompleto
    numForos.value=datos.foroscreados
    numFotos.value=datos.numfotos
    numcodigos.value=datos.numcodigo

  })
  .catch(error => {
    // Manejar errores aquí
    console.error('Error:', error);
  });   


const profilePicture = ref('')
const username = ref('')
const fechaNacimiento = ref('')
const gender = ref()
const phoneNumber = ref('')
const joinDate = ref('')
const description = ref('')
const location = ref('')
const fullName = ref('')
const numFotos = ref(0)
const numcodigos = ref(0)
const numForos = ref(0)
</script>

<template>
  <div>
    <main class="bg-gray-100 bg-opacity-25">
      <div class="lg:w-8/12 lg:mx-auto mb-8">
        <header class="flex flex-wrap items-center p-4 md:py-8">
          <div class="md:w-3/12 md:ml-16">
            <img class="w-20 h-20 md:w-40 md:h-40 object-cover border rounded-full p-1" :src="profilePicture" alt="profile" />
          </div>
          <div class="w-8/12 md:w-7/12 ml-4">
            <div class="md:flex md:flex-wrap md:items-center mb-4">
              <h2 class="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">{{ username }}</h2>
              <span class="inline-block fas fa-certificate fa-lg text-blue-500 relative mr-6 text-xl transform -translate-y-2" aria-hidden="true">
                <i class="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px"></i>
              </span>
              <Button label="Editar perfil" class="bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded text-center sm:inline-block block" @click="abrirModal" />
            </div>
            <ul class="hidden md:flex space-x-8 mb-4">
              <li>
                <span class="font-semibold">{{ numFotos }}</span>
                posts
              </li>
              <li>
                <span class="font-semibold">{{ numcodigos }}</span>
                scripts
              </li>
              <li>
                <span class="font-semibold">{{ numForos }}</span>
                foros {{  }}
              </li>
            </ul>
            <div class="hidden md:block">
              <h1 class="font-semibold">{{ fullName }}</h1>
              <p class="text-gray-400">{{ joinDate }}</p>
              <span class="underline">{{ location }}</span>
              <p>{{ fechaNacimiento }}</p>
              <p>{{ description }}</p>
            </div>
          </div>
          <div class="md:hidden text-sm my-2">
            <h1 class="font-semibold">{{ fullName }}</h1>
            <p class="text-gray-400">{{ joinDate }}</p>
            <span class="underline">{{ location }}</span>
            <p>{{ fechaNacimiento }}</p>
            <p>{{ description }}</p>
          </div>
        </header>
        <div class="px-px md:px-3">
          <ul class="flex md:hidden justify-around space-x-8 border-t text-center p-2 text-gray-600 leading-snug text-sm">
            <li>
              <span class="font-semibold text-gray-800 block">{{ numFotos }}</span>
              posts
            </li>
            <li>
              <span class="font-semibold text-gray-800 block">{{ numcodigos }}</span>
              scripts
            </li>
            <li>
              <span class="font-semibold text-gray-800 block">{{ numForos }}</span>
              foros
            </li>
          </ul>
          <TabViewComponent />
        </div>
      </div>
    </main>
    <DialogComponent v-if="mostrarModal" @cerrar="controlarEmit" />
  </div>
</template>

<style scoped></style>
