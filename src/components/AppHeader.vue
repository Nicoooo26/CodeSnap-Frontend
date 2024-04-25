<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import router from '@/router'
import { ref } from 'vue'

const visible = ref(false)
const isDark = useDark()
const toggleDark = useToggle(isDark)

const menu = ref()
const signOut = () => router.push('/')
const profileMove = () => router.push('/profile')
const settingMove = () => router.push('/setting')

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
  <div class="card flex justify-center">
    <Sidebar v-model:visible="visible">
      <template #container="{ closeCallback }">
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-between px-4 pt-3 flex-shrink-0">
            <span class="flex items-center space-x-2">
              <img src="/logo.jpg" alt="Logo" class="w-9 h-9" />
              <span class="font-semibold text-2xl text-primary">CodeSnap</span>
            </span>

            <span>
              <Button type="button" @click="closeCallback" icon="pi pi-times" class="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center"></Button>
            </span>
          </div>
          <div class="overflow-y-auto">
            <ul class="p-3 m-0">
              <li>
                <div class="p-3 flex items-center justify-between text-600 cursor-pointer"></div>
                <ul class="p-0 m-0 overflow-hidden">
                  <!-- Tu lista de elementos -->
                  <RouterLink to="/home" @click="visible = false">
                  <li>
                    <div v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple hover:bg-gray-100">
                      <i class="pi pi-home mr-2"></i>
                      <span class="font-medium">Home</span>
                    </div>
                  </li>
                </RouterLink>
                <RouterLink to="/explorar" @click="visible = false">
                  <li>
                    <div v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple hover:bg-gray-100">
                      <i class="pi pi-compass mr-2"></i>
                      <span class="font-medium">Explorar</span>
                    </div>
                  </li>
                </RouterLink>
                  <RouterLink to="/instantaneas" @click="visible = false">
                  <li>
                    <div v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple hover:bg-gray-100">
                      <i class="pi pi-images mr-2"></i>
                      <span class="font-medium">Instantáneas</span>
                    </div>
                  </li>
                </RouterLink>
                  <RouterLink to="/foros" @click="visible = false">
                  <li>
                    <a v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple hover:bg-gray-100">
                      <i class="pi pi-comments mr-2"></i>
                      <span class="font-medium">Foros</span>
                    </a>
                  </li>
                </RouterLink>
                  <RouterLink to="/scripts" @click="visible = false">
                  <li>
                    <div v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple hover:bg-gray-100">
                      <i class="pi pi-code mr-2"></i>
                      <span class="font-medium">Scripts</span>
                    </div>
                  </li>
                </RouterLink>
                </ul>
              </li>
            </ul>
            <ul class="list-none p-3 m-0">
              <li>
                <div class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple">
                  <span class="font-medium">CONFIGURACIÓN GENERAL</span>
                </div>
                <ul class="list-none p-0 m-0 overflow-hidden">
                  <RouterLink to="/setting" @click="visible = false">
                  <li>
                    <div v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple hover:bg-gray-100">
                      <i class="pi pi-cog mr-2"></i>
                      <span class="font-medium">Ajustes</span>
                    </div>
                  </li>
                </RouterLink>
                <RouterLink to="/soporte" @click="visible = false">
                  <li>
                    <div v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple hover:bg-gray-100">
                      <i class="pi pi-envelope mr-2"></i>
                      <span class="font-medium">Soporte</span>
                    </div>
                  </li>
                </RouterLink>
                  <RouterLink to="/politicyPrivacity">
                  <li>
                    <div v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple hover:bg-gray-100">
                      <i class="pi pi-file mr-2"></i>
                      <span class="font-medium">Política de Privacidad</span>
                    </div>
                  </li>
                </RouterLink>
                <RouterLink to="/">
                  <li>
                    <div v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-700 transition-duration-150 transition-colors p-ripple hover:bg-red-600/20">
                      <i class="pi pi-sign-out mr-2 text-red-600"></i>
                      <span class="font-medium text-red-600">Log Out</span>
                    </div>
                  </li>
                  </RouterLink>
                </ul>
              </li>
            </ul>
          </div>
          <RouterLink to="/profile" @click="visible = false">
            <div class="mt-auto">
              <hr class="my-3 border-t border-gray-300" />
              <div class="m-3 flex items-center cursor-pointer p-3 gap-2 rounded border border-gray-300 hover:bg-gray-100">
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                <span class="font-bold">User129342</span>
              </div>
            </div>
          </RouterLink>
        </div>
      </template>
    </Sidebar>
  </div>
</template>
