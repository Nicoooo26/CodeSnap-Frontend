<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import router from '@/router'
import { ref } from 'vue'
import SideBarComponent from './SideBarComponent.vue';
import { useCookies } from 'vue3-cookies';

const {cookies} = useCookies()

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
const profileMove = () => router.push('/profile')
const settingMove = () => router.push('/setting')

const items = ref([
  {
    label: 'User49423',
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

const toggle = (event: Event) => {
  menu.value.toggle(event)
}

</script>
<template>
  <nav class="bg-white dark:bg-gray-900 border-b border-gray-700">
    <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
      <div class="flex items-center space-x-3 rtl:space-x-reverse">
        <RouterLink to="/home" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo.jpg" class="h-8 logoNavbar rounded-lg" alt="CodeSnap Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CodeSnap</span>
        </RouterLink>
      </div>
      <div class="flex items-center md:order-2 space-x-4 md:space-x-5 rtl:space-x-reverse">
        <div class="card flex justify-content-center">
          <Button type="button" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" class=""> <Avatar icon="pi pi-user" class="mr-2 bg-gray-50 border border-gray-800 dark:border-gray-100" size="large" shape="circle" /></Button>
          <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
        </div>
        <button @click="toggleDark()" class="top-4 right-4 border border-gray-500 dark:border-gray-500 dark:bg-gray-800 rounded-full px-3 py-2">
          <span class="text-white pi pi-moon" v-if="isDark"></span>
          <span class="text-dark pi pi-sun" v-else></span>
        </button>
        <Button class="dark:text-white pi pi-bars border border-gray-500 dark:bg-gray-800 px-2 py-2" @click="visible = true" />
      </div>
    </div>
  </nav>
  <SideBarComponent :visible="visible" @visible="VisibleOff" />
</template>
