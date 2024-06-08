<script setup lang="ts">
import { useCookies } from 'vue3-cookies'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import router from '@/router'

// Ruta del backend desde variables de entorno
const URL_Backend = import.meta.env.VITE_URL_BACKEND

// Obtener token de cookies
const { cookies } = useCookies()
const token: string = cookies.get('token')

//Definición de props
const props = defineProps(['visible'])

//Variables reactivas
const username = ref<string>('')
const profilePicture = ref<string>('')
const privileges = ref<string>('')
const data = ref<any>({})

// Obtener datos necesarios del usuario 
const getDataUser=async()=>{
  try{
    const response = await axios.get(`${URL_Backend}user?token=${token}`, { headers: { 'api-key': `${token}` } })
    data.value = response.data.users[0]
    username.value = data.value.username
    profilePicture.value = data.value.profilePicture ? data.value.profilePicture : '/usuario.png'
    privileges.value = data.value.role
  }catch(e){
    console.log(e)
  }
}

onMounted(()=>{
  getDataUser()
})

//Borrar token y regresar al loggin
const logout = () => {
  cookies.remove('token')
  router.push('/')
}
</script>
<template>
  <div>
    <div >
      <!-- eslint-disable-next-line vue/no-mutating-props -->
      <Sidebar v-model:visible="props.visible">
        <template #container>
          <div class="flex flex-col h-full bg-stone-100 dark:bg-stone-900">
            <div class="flex items-center justify-between px-4 pt-3 flex-shrink-0">
              <span class="flex items-center space-x-2">
                <div class="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-white border border-stone-500 dark:border-stone-300">
                  <img src="/logo.jpg" alt="Logo" class="w-9 h-9" />
                </div>
                <span class="font-semibold text-2xl text-primary text-stone-600 dark:text-stone-200">CodeSnap</span>
              </span>

              <span>
                <Button type="button" @click="$emit('visible')" icon="pi pi-times" class="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-stone-300 dark:bg-stone-100 dark:hover:bg-stone-300"></Button>
              </span>
            </div>
            <div class="overflow-y-auto">
              <ul class="p-3 m-0">
                <li>
                  <div class="p-3 flex items-center justify-between text-600 cursor-pointer"></div>
                  <ul class="p-0 m-0 overflow-hidden">
                    <RouterLink v-if="privileges == 'ADMIN'" to="/admin" @click="$emit('visible')">
                      <li>
                        <div v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple hover:bg-blue-600/20">
                          <i class="pi pi-prime mr-2 text-blue-500"></i>
                          <span class="font-medium text-blue-500">Admin</span>
                        </div>
                      </li>
                    </RouterLink>
                    <RouterLink to="/home" @click="$emit('visible')">
                      <li>
                        <div v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple hover:bg-stone-300 dark:hover:bg-stone-700">
                          <i class="pi pi-home mr-2 text-stone-600 dark:text-stone-200"></i>
                          <span class="font-medium text-stone-600 dark:text-stone-200">Home</span>
                        </div>
                      </li>
                    </RouterLink>
                    <RouterLink to="/explorar" @click="$emit('visible')">
                      <li>
                        <div v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple hover:bg-stone-300 dark:hover:bg-stone-700">
                          <i class="pi pi-compass mr-2 text-stone-600 dark:text-stone-200"></i>
                          <span class="font-medium text-stone-600 dark:text-stone-200">Explorar</span>
                        </div>
                      </li>
                    </RouterLink>
                    <RouterLink to="/fotos" @click="$emit('visible')">
                      <li>
                        <div v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple hover:bg-stone-300 dark:hover:bg-stone-700">
                          <i class="pi pi-images mr-2 text-stone-600 dark:text-stone-200"></i>
                          <span class="font-medium text-stone-600 dark:text-stone-200">Instantáneas</span>
                        </div>
                      </li>
                    </RouterLink>
                    <RouterLink to="/foros" @click="$emit('visible')">
                      <li>
                        <a v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple hover:bg-stone-300 dark:hover:bg-stone-700">
                          <i class="pi pi-comments mr-2 text-stone-600 dark:text-stone-200"></i>
                          <span class="font-medium text-stone-600 dark:text-stone-200">Foros</span>
                        </a>
                      </li>
                    </RouterLink>
                    <RouterLink to="/scripts" @click="$emit('visible')">
                      <li>
                        <div v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple hover:bg-stone-300 dark:hover:bg-stone-700">
                          <i class="pi pi-code mr-2 text-stone-600 dark:text-stone-200"></i>
                          <span class="font-medium text-stone-600 dark:text-stone-200">Scripts</span>
                        </div>
                      </li>
                    </RouterLink>
                  </ul>
                </li>
              </ul>
              <ul class="list-none p-3 m-0">
                <li>
                  <div class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple">
                    <span class="font-medium text-stone-600 dark:text-stone-200">CONFIGURACIÓN GENERAL</span>
                  </div>
                  <ul class="list-none p-0 m-0 overflow-hidden">
                    
                    <RouterLink to="/soporte" @click="$emit('visible')">
                      <li>
                        <div v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple hover:bg-stone-300 dark:hover:bg-stone-700">
                          <i class="pi pi-envelope mr-2 text-stone-600 dark:text-stone-200"></i>
                          <span class="font-medium text-stone-600 dark:text-stone-200">Soporte</span>
                        </div>
                      </li>
                    </RouterLink>
                    <RouterLink to="/politicyPrivacity">
                      <li>
                        <div v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple hover:bg-stone-300 dark:hover:bg-stone-700">
                          <i class="pi pi-file mr-2 text-stone-600 dark:text-stone-200"></i>
                          <span class="font-medium text-stone-600 dark:text-stone-200">Política de Privacidad</span>
                        </div>
                      </li>
                    </RouterLink>
                    <button @click="logout" class="w-full">
                      <li>
                        <div v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple hover:bg-red-600/20">
                          <i class="pi pi-sign-out mr-2 text-red-600"></i>
                          <span class="font-medium text-red-600">Desconectar</span>
                        </div>
                      </li>
                    </button>
                  </ul>
                </li>
              </ul>
            </div>
            <RouterLink to="/profile" @click="$emit('visible')">
              <div class="mt-auto">
                <hr class="my-3 border-t border-gray-300" />
                <div class="m-3 flex items-center cursor-pointer p-3 gap-2 rounded border border-stone-600 hover:bg-stone-300 dark:hover:bg-stone-700">
                  <img :src="profilePicture" class="w-14 h-14 object-cover border rounded-full p-1 dark:bg-stone-200" />
                  <span class="font-bold text-stone-600 dark:text-stone-200">{{ username }}</span>
                </div>
              </div>
            </RouterLink>
          </div>
        </template>
      </Sidebar>
    </div>
  </div>
</template>

<style scoped></style>
