<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import router from '@/router';

const isDark = useDark()
const toggleDark = useToggle(isDark)

import { ref } from 'vue'

const menu = ref()
const signOut = () => router.push('/');
const profileMove = () => router.push('/profile');
const settingMove = () => router.push('/setting');

const items = ref([
  {
    label: 'User49423',
    items: [
    {
        label: 'Profile',
        icon: 'pi pi-user',
        command: profileMove

      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: settingMove
      },
      {
        label: 'Sign out',
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
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
      <div class="flex items-center space-x-3 rtl:space-x-reverse">
        <RouterLink to="/home" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo.jpg" class="h-8 logoNavbar rounded-lg" alt="CodeSnap Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CodeSnap</span>
        </RouterLink>
      </div>
      <div class="flex items-center md:order-2 space-x-4 md:space-x-5 rtl:space-x-reverse">
        <button @click="toggleDark()" class=" top-4 right-4 bg-white border border-gray-500 dark:border-gray-500 dark:bg-gray-800 rounded-full px-3 py-2">
          <span class=" text-white pi pi-moon " v-if="isDark"></span>
          <span class="text-dark pi pi-sun" v-else></span>
        </button>
        <div class="card flex justify-content-center  ">
          <Button type="button" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" class=""> <Avatar icon="pi pi-user" class="mr-2 bg-gray-50  border border-gray-800 dark:border-gray-100"  size="large" shape="circle" /></Button>
          <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
        </div>
      </div>
      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
        <form class="flex items-center">
          <label for="simple-search" class="sr-only">Buscar</label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span class="pi pi-search dark:text-white"></span>
            </div>
            <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Buscar" />
          </div>
          <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-900 focus:ring-4 focus:outline-none border focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-800 dark:focus:ring-white">
            <span class="pi pi-search dark:text-white"></span>
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>