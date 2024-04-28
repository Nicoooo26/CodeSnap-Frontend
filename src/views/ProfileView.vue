<script setup lang="ts">
import { ref } from 'vue'
import TabViewComponent from '@/components/TabViewComponent.vue';
import DialogComponent from '@/components/DialogComponent.vue';

const visible = ref(false);
const visibleChange = (visibleP: any) => visible.value = visibleP;


const profilePicture = ref('usuario.png')
const username = ref('nico26')
const fechaNacimiento = ref('01/01/2000')
const gender = ref(1)
const phoneNumber = ref('123-456-7890')
const joinDate = ref('En CodeSnap desde el 26 de Marzo del 2012')
const description = ref('Descripción del usuariolalallallalallalal')
const location = ref('Madrid, Spain')
const fullName = ref('Nicolas Guañuna')
const numFotos = ref(10)
const numcodigos = ref(20)
const numForos = ref(5)
</script>

<template>
  <div>
    <main class="bg-gray-100 bg-opacity-25">
      <div class="lg:w-8/12 lg:mx-auto mb-8">
        <header class="flex flex-wrap items-center p-4 md:py-8">
          <div class="md:w-3/12 md:ml-16">
            <img class="w-20 h-20 md:w-40 md:h-40 object-cover border rounded-full p-1" :src="profilePicture"
              alt="profile" />
          </div>
          <div class="w-8/12 md:w-7/12 ml-4">
            <div class="md:flex md:flex-wrap md:items-center mb-4">
              <h2 class="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">{{ username }}</h2>
              <span
                class="inline-block fas fa-certificate fa-lg text-blue-500 relative mr-6 text-xl transform -translate-y-2"
                aria-hidden="true">
                <i class="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px"></i>
              </span>
              <Button label="Editar perfil"
                class="bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded text-center sm:inline-block block"
                @click="visible = true" />
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
                foros
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
          <ul
            class="flex md:hidden justify-around space-x-8 border-t text-center p-2 text-gray-600 leading-snug text-sm">
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
    <DialogComponent :visible="visible" @visible="visibleChange" />
  </div>
</template>

<style scoped></style>