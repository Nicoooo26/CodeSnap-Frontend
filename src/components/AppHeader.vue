<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import router from '@/router'
import { onMounted, ref } from 'vue'
import SideBarComponent from './SideBarComponent.vue';
import { useCookies } from 'vue3-cookies';
import axios from 'axios';

// Ruta del backend desde variables de entorno
const URL_Backend = import.meta.env.VITE_URL_BACKEND

// Obtener token de cookies
const { cookies } = useCookies()
const token: string = cookies.get('token')

const username = ref('')
const visible = ref(false)
const VisibleOff=()=>{
  visible.value=false
}
const isDark = useDark()
const toggleDark = useToggle(isDark)

const menu = ref()
const signOut = () => {
  cookies.remove('token')
  router.push('/')
}
const profileMove = () => {
  router.push('/profile')
  location.reload
}
const settingMove = () => router.push('/setting')
const getUsers = async () => {
  try {
    const response = await axios.get(`${URL_Backend}user?token=${token}`, {
      headers: { 'api-key': `${token}` }
    })
    username.value = response.data.users[0].username
  } catch (e) {
    console.log(e)
  }
}
const items = ref([
  {
    label: username,
    items: [
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        command: profileMove
      },
      {
        label: 'Ajustes',
        icon: 'pi pi-cog',
        command: settingMove
      },
      {
        label: 'Desconectar',
        icon: 'pi pi-sign-out',
        command: signOut
      }
    ]
  }
])
onMounted(async()=>{
  await getUsers()
})
const toggle = (event: Event) => {
  menu.value.toggle(event)
}

</script>
<template>
  <nav class="bg-stone-200 dark:bg-stone-800 border-b border-stone-700 transition-colors duration-300">
    <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
      <div class="flex items-center space-x-3 rtl:space-x-reverse">
        <RouterLink to="/home" class="flex items-center space-x-3 rtl:space-x-reverse transition-colors duration-300 ">
          <img src="/logo.jpg" class="h-8 logoNavbar rounded-lg transition-opacity duration-300 hover:opacity-75" alt="CodeSnap Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-stone-400">CodeSnap</span>
        </RouterLink>
      </div>
      <div class="flex items-center md:order-2 space-x-4 md:space-x-5 rtl:space-x-reverse">
        <div class="card flex justify-content-center">
          <Button type="button" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" class=""> <Avatar icon="pi pi-user" class="mr-2 bg-stone-400 hover:bg-stone-600 border border-stone-800 dark:border-stone-100" size="large" shape="circle" /></Button>
          <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
        </div>
        <button @click="toggleDark()" class="top-4 right-4  dark:bg-stone-800 rounded-full px-3 py-2 transition-colors duration-300 ease-in-out hover:bg-stone-600 dark:hover:bg-stone-700">
          <span class="text-white pi pi-sun" v-if="isDark"></span>
          <span class="text-dark pi pi-moon" v-else></span>
        </button>
        <Button class="dark:text-white pi pi-bars px-2 py-2 transition-colors duration-300 ease-in-out hover:bg-stone-600 dark:hover:bg-stone-700" @click="visible = true" />
      </div>
    </div>
  </nav>
  <SideBarComponent :visible="visible" @visible="VisibleOff" />
</template>