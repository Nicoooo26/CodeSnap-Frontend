<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import TabViewComponent from '@/components/TabViewComponent.vue'
import UpdateUserComponent from '@/components/UpdateUserComponent.vue'
import { useCookies } from 'vue3-cookies'
import axios from 'axios'
import { useRoute } from 'vue-router'

const URL_Backend = import.meta.env.VITE_URL_BACKEND
const mostrarModal = ref(false)

const abrirModal = () => {
  mostrarModal.value = true
}
const cerrarModal = () => {
  mostrarModal.value = false
}
const controlarEmit = (mssg: string) => {
  cerrarModal()
  if (mssg === 'ok') {
    obtenerDatosUser()
  }
}

const { cookies } = useCookies()
const token = cookies.get('token')
const datos = ref<any>({})
const route = useRoute()

const obtenerDatosUser = async (userId?: string): Promise<void> => {
  try {
    const endpoint = userId ? `${URL_Backend}user?id=${userId}` : `${URL_Backend}user?token=${token}`
    const response = await axios.get(endpoint, {
      headers: { 'api-key': `${token}` },
    })
    datos.value = response.data.users[0]
    datos.value.profilePicture=datos.value.profilePicture?datos.value.profilePicture:'/FCTProject/public/usuario.png'
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  const userId = route.params.id as string | undefined
  obtenerDatosUser(userId)
})
// Observar cambios en los parámetros de la ruta
watch(() => route.params.id, (newId:any) => {
  obtenerDatosUser(newId)
})
const isCurrentUser = computed(() => !route.params.id)
const userId = computed(() => route.params.id as string | undefined)

</script>

<template>
  <div>
    <main class="bg-gray-100 bg-opacity-25">
      <div class="lg:w-8/12 lg:mx-auto">
        <header class="flex flex-wrap items-center p-4 md:py-2">
          <div class="md:w-3/12 md:ml-16">
            <img class="w-20 h-20 md:w-40 md:h-40 object-cover border rounded-full p-1" :src="datos.profilePicture" alt="profile" />
          </div>
          <div class="w-8/12 md:w-7/12 ml-4">
            <div class="md:flex md:flex-wrap md:items-center mb-4">
              <h2 class="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">{{ datos.username }}</h2>
              <span class="inline-block fas fa-certificate fa-lg text-blue-500 relative mr-6 text-xl transform -translate-y-2" aria-hidden="true">
                <i class="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px"></i>
              </span>
              <Button v-if="isCurrentUser" label="Editar perfil" class="bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded text-center sm:inline-block block" @click="abrirModal" />
            </div>
            <ul class="hidden md:flex space-x-8 mb-4">
              <li>
                <span class="font-semibold">{{ datos.numPhotos }}</span>
                posts
              </li>
              <li>
                <span class="font-semibold">{{ datos.numCodes }}</span>
                scripts
              </li>
              <li>
                <span class="font-semibold">{{ datos.numForums }}</span>
                foros
              </li>
            </ul>
            <div class="hidden md:block">
              <h1 class="font-semibold">{{ datos.fullname }}</h1>
              <p class="text-gray-400">{{ `En CodeSnap desde el ${datos.dateCreated}` }}</p>
              <span class="underline">{{ datos.location }}</span>
              <p v-if="datos.birthdate !== '0000-00-00'">{{ datos.birthdate }}</p>
              <p>{{ datos.description }}</p>
            </div>
          </div>
          <div class="md:hidden text-sm my-2">
            <h1 class="font-semibold">{{ datos.fullname }}</h1>
            <p class="text-gray-400">{{ `En CodeSnap desde el ${datos.dateCreated}` }}</p>
            <span class="underline">{{ datos.location }}</span>
            <p>{{ datos.birthdate }}</p>
            <p>{{ datos.description }}</p>
          </div>
        </header>
        <div class="px-px md:px-3">
          <ul class="flex md:hidden justify-around space-x-8 border-t text-center p-2 text-gray-600 leading-snug text-sm">
            <li>
              <span class="font-semibold text-gray-800 block">{{ datos.numPhotos }}</span>
              posts
            </li>
            <li>
              <span class="font-semibold text-gray-800 block">{{ datos.numCodes }}</span>
              scripts
            </li>
            <li>
              <span class="font-semibold text-gray-800 block">{{ datos.numForums }}</span>
              foros
            </li>
          </ul>
          <TabViewComponent @cerrar="obtenerDatosUser" v-bind="userId && { userId }" :numScripts=datos.numCodes :numPhotos=datos.numPhotos :numForums=datos.numForums />
        </div>
      </div>
    </main>
    <UpdateUserComponent v-if="mostrarModal" @cerrar="controlarEmit" />
  </div>
</template>

<style scoped></style>
