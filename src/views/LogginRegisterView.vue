<script setup lang="ts">
import { validateFormatUsername, validateFormatEmail } from '@/others/validations/formatValidations'
import { ref, computed } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import Password from 'primevue/password'
import { useRouter } from 'vue-router'
import { createUser } from '@/bbdd/functionsBBDD'
import axios from 'axios'
import { useTokenStore } from '@/storage/store'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const router = useRouter()
const storeToken = useTokenStore()

const loginVisible = ref(true)
const usernameRegistro = ref('')
const usernameLogin = ref('')
const passwordLogin = ref('')
const emailRegistro = ref('')
const passwordRegistro = ref('')
const emailError = ref(false)
const passwordError = ref(false)
const usernameError = ref(false)
const usernameVacio = ref(false)
const showPopup = ref(false)
const emailVacio = ref(false)
const passwordVacio = ref(false)
const credencialesError = ref(false)

const toggleButtonText = computed(() => {
  return loginVisible.value ? '¿No tienes una cuenta? Regístrate' : '¿Tienes una cuenta? Inicia Sesión'
})

const toggleForm = () => {
  loginVisible.value = !loginVisible.value
  usernameRegistro.value = ''
  usernameLogin.value = ''
  passwordLogin.value = ''
  emailRegistro.value=''
  passwordRegistro.value=''
  emailError.value = false
  emailVacio.value = false
  passwordError.value = false
  passwordVacio.value = false
  usernameError.value = false
  usernameVacio.value = false
}

const login = () => {
  if (passwordLogin.value === '') {
    passwordVacio.value = true
  } else {
    passwordVacio.value = false
  }
  if (usernameLogin.value === '') {
    usernameVacio.value = true
  } else {
    usernameVacio.value = false
  }
  if(passwordVacio.value===false && usernameVacio.value===false){
    axios.post('http://localhost/DWES/CodeSnapBackEnd/auth',{
      username: usernameLogin.value,
      password: passwordLogin.value
    }).then(response => {
      storeToken.saveToken(response.data.token)
      router.push({ name: 'home' })
    })
  }

}

const register = () => {
  if (usernameRegistro.value === '') {
    usernameVacio.value = true
  } else {
    usernameVacio.value = false
    if (!validateFormatUsername(usernameRegistro.value)) {
      usernameError.value = true
    } else {
      usernameError.value = false
    }
  }
  if (emailRegistro.value === '') {
    emailVacio.value = true
  } else {
    emailVacio.value = false
    if (!validateFormatEmail(emailRegistro.value)) {
      emailError.value = true
    } else {
      emailError.value = false
    }
  }
  if (passwordRegistro.value === '') {
    passwordVacio.value = true
  } else {
    passwordVacio.value = false
  }

  if (!usernameVacio.value && !usernameError.value && !emailError.value && !emailVacio.value && !passwordVacio.value) {
    createUser(usernameRegistro.value,emailRegistro.value,passwordRegistro.value);
    showPopup.value = true
    loginVisible.value=true
    setTimeout(() => {
      closePopup()
    }, 5000)
  }
}

const closePopup = () => {
  showPopup.value = false
}
</script>

<template>
  <div id="app" class="flex h-screen">
    <div v-if="showPopup" id="toast-success" class="absolute top-4 left-10 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
      <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span class="sr-only">Check icon</span>
      </div>
      <div class="ms-3 text-sm font-normal">Registrado correctamente.</div>
      <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close" @click="closePopup">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
      </button>
    </div>

    <div class="w-1/2 flex flex-col justify-center px-8 bg-gray-50 text-white dark:bg-gray-800 border-r-2 dark:border-white border-black">
      <div class="flex flex-col items-center mb-8">
        <h1 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Bienvenido a CodeSnap</h1>
        <img src="/logo.jpg" alt="Descripción de la imagen" class="w-40 h-40 mb-4 bg-white rounded-lg" />
        <p class="text-lg text-center text-gray-900 dark:text-white">Descubre una plataforma para desarrolladores donde puedes compartir tus ideas, código y experiencias de manera fácil y rápida.</p>
      </div>
    </div>

    <div class="w-1/2 flex justify-center items-center bg-gray-50 dark:bg-gray-800">
     <div class="max-w-md w-full">
        <h2 class="font-bold dark:text-white text-gray-900 text-2xl">
          {{ loginVisible ? 'INICIAR SESIÓN' : 'REGISTRO' }}
        </h2>
        <button @click="toggleDark()" class=" absolute top-4 right-4 bg-white border border-gray-500 dark:border-gray-500 dark:bg-gray-800 rounded-full px-3 py-2">
          <span class=" text-white pi pi-moon " v-if="isDark"></span>
          <span class="text-dark pi pi-sun" v-else></span>
        </button>

        <form id="login-form" class="bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4" :class="{ hidden: !loginVisible }" @submit.prevent="login">
          <div class="mb-4">
            <label>
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-black dark:text-white text-sm font-bold mb-2">Username</span>
              <input type="text" class="dark:bg-gray-600 dark:text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="usernameLogin" v-model="usernameLogin" placeholder="Username" />
              <p v-if="usernameVacio" class="mt-1 text-pink-600 text-sm">Este campo es obligatorio.</p>
            </label>
          </div>
          <div class="mb-6">
            <label>
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-black dark:text-white text-sm font-bold mb-2">Contraseña</span>
              <input type="password" class="dark:bg-gray-600 dark:text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" v-model="passwordLogin" placeholder="Password" />
              <p v-if="credencialesError" class="mt-1 text-pink-600 text-sm">Credenciales incorrectas.</p>
              <p v-if="passwordVacio" class="mt-1 text-pink-600 text-sm">Este campo es obligatorio.</p>
            </label>
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Iniciar Sesión</button>
          </div>
        </form>

        <form id="register-form" class="bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4" :class="{ hidden: loginVisible }" @submit.prevent="register">
          <div class="mb-2">
            <label>
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-700 dark:text-white text-sm font-bold mb-2">Username</span>
              <input type="text" class="dark:bg-gray-600 dark:text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="username" v-model="usernameRegistro" placeholder="Username" />
              <p v-if="usernameError" class="mt-1 text-pink-600 text-sm">Solo se permiten números y letras.</p>
              <p v-if="usernameVacio" class="mt-1 text-pink-600 text-sm">Este campo es obligatorio.</p>
            </label>
          </div>
          <div class="mb-4">
            <label>
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-700 dark:text-white text-sm font-bold mb-2">Email</span>
              <input type="email" class="dark:bg-gray-600 dark:text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="emailRegistro" v-model="emailRegistro" placeholder="Email" />
              <p v-if="emailError" class="mt-1 text-pink-600 text-sm">Por favor, introduce un email válido.</p>
              <p v-if="emailVacio" class="mt-1 text-pink-600 text-sm">Este campo es obligatorio.</p>
            </label>
          </div>
          <div class="mb-24">
            <label>
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-700 dark:text-white text-sm font-bold mb-2">Contraseña</span>
              <Password v-model="passwordRegistro" toggleMask />
              <p v-if="passwordVacio" class="mt-1 text-pink-600 text-sm">Este campo es obligatorio.</p>
            </label>
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Registrarse</button>
          </div>
        </form>

        <div class="flex items-center justify-center mt-6">
          <button id="toggle-form" class="text-sm dark:text-white text-black hover:underline focus:outline-none" type="button" @click="toggleForm">
            {{ toggleButtonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
