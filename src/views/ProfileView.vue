<script setup lang="ts">
import { ref } from 'vue'

const profilePicture = ref('./public/usuario.png')
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
            <a href="#" class="bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded text-center sm:inline-block block">Edit</a>
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
        <TabView class="space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 border-t">
          <TabPanel>
            <template #header>
              <div class="flex align-items-center gap-2">
                <i class="pi pi-image text-xl md:text-xs"></i>
                <span class="font-bold white-space-nowrap">posts</span>
              </div>
            </template>
            <div class="m-0">
              <div class="flex flex-wrap -mx-px md:-mx-3">
            <div class="w-1/3 p-px md:px-3">
              <a href="#">
                <article class="post bg-gray-100 text-white relative pb-full md:mb-6">
                  <img class="w-full h-full absolute left-0 top-0 object-cover" src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="image" />
                  <i class="fas fa-square absolute right-0 top-0 m-1"></i>
                  <div class="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                    <div class="flex justify-center items-center space-x-4 h-full">
                      <span class="p-2">
                        <i class="pi pi-heart"></i>
                        4
                      </span>
                    </div>
                  </div>
                </article>
              </a>
            </div>
            <div class="w-1/3 p-px md:px-3">
              <a href="#">
                <article class="post bg-gray-100 text-white relative pb-full md:mb-6">
                  <img class="w-full h-full absolute left-0 top-0 object-cover" src="https://images.unsplash.com/photo-1498409570040-05bf6d3dd5b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="image" />
                  <div class="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                    <div class="flex justify-center items-center space-x-4 h-full">
                      <span class="p-2">
                        <i class="pi pi-heart"></i>
                        412K
                      </span>
                    </div>
                  </div>
                </article>
              </a>
            </div>
            <div class="w-1/3 p-px md:px-3">
              <a href="#">
                <article class="post bg-gray-100 text-white relative pb-full md:mb-6">
                  <img class="w-full h-full absolute left-0 top-0 object-cover" src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="image" />
                  <div class="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                    <div class="flex justify-center items-center space-x-4 h-full">
                      <span class="p-2">
                        <i class="pi pi-heart"></i>
                        112K
                      </span>
                    </div>
                  </div>
                </article>
              </a>
            </div>
            <div class="w-1/3 p-px md:px-3">
              <a href="#">
                <article class="post bg-gray-100 text-white relative pb-full md:mb-6">
                  <img class="w-full h-full absolute left-0 top-0 object-cover" src="https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="image" />
                  <i class="fas fa-video absolute right-0 top-0 m-1"></i>
                  <div class="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                    <div class="flex justify-center items-center space-x-4 h-full">
                      <span class="p-2">
                        <i class="pi pi-heart"></i>
                        841K
                      </span>
                    </div>
                  </div>
                </article>
              </a>
            </div>
            <div class="w-1/3 p-px md:px-3">
              <a href="#">
                <article class="post bg-gray-100 text-white relative pb-full md:mb-6">
                  <img class="w-full h-full absolute left-0 top-0 object-cover" src="https://images.unsplash.com/photo-1475688621402-4257c812d6db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80" alt="image" />
                  <div class="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                    <div class="flex justify-center items-center space-x-4 h-full">
                      <span class="p-2">
                        <i class="pi pi-heart"></i>
                        120K
                      </span>
                    </div>
                  </div>
                </article>
              </a>
            </div>
          </div>
        </div>
          </TabPanel>
          <TabPanel>
            <template #header>
              <div class="flex align-items-center gap-2">
                <i class="pi pi-code text-xl md:text-xs"></i>
                <span class="font-bold white-space-nowrap">scripts</span>
              </div>
            </template>
            <div class="m-0">No existen scripts actualmente</div>
            </TabPanel>
            <TabPanel>
            <template #header>
              <div class="flex align-items-center gap-2">
                <i class="pi  pi-comments text-xl md:text-xs"></i>
                <span class="font-bold white-space-nowrap">foros</span>
              </div>
            </template>
            <div class="m-0">No existen foros actualmente</div>
            </TabPanel>
        </TabView>
      </div>
    </div>
  </main>
</template>
<style scoped>
</style>