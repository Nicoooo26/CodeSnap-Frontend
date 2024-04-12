<script setup lang="ts">
// Importamos las funciones necesarias de Vue
import { validateFormatUsername, validateFormatEmail } from '@/others/validations/formatValidations'
import { ref, computed } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import Password from 'primevue/password'
import { useRouter } from 'vue-router';

const isDark = useDark()
const toggleDark = useToggle(isDark)
const router = useRouter()

// Creamos instancias reactivas para los datos
const loginVisible = ref(true)
const username = ref('')
const email = ref('')
const password = ref('')
const emailError = ref(false)
const passwordError = ref(false)
const usernameError = ref(false)
const usernameVacio = ref(false)
const showPopup = ref(false)
const emailVacio = ref(false)
const passwordVacio = ref(false)

// Calculamos el texto del botón de alternancia
const toggleButtonText = computed(() => {
  return loginVisible.value ? '¿No tienes una cuenta? Regístrate' : '¿Tienes una cuenta? Inicia Sesión'
})

// Función para alternar entre el formulario de inicio de sesión y registro
const toggleForm = () => {
  loginVisible.value = !loginVisible.value
  username.value = ''
  email.value = ''
  password.value = ''
  emailError.value=false
  emailVacio.value=false
  passwordError.value=false
  passwordVacio.value=false
  usernameError.value=false
  usernameVacio.value=false
}

// Función para manejar el inicio de sesión
const login = () => {
  if (password.value === '') {
    passwordVacio.value = true
  } else {
    passwordVacio.value = false
    if (password.value !== '1234') {
      passwordError.value = true
    } else {
      passwordError.value = false
    }
  }
  if (email.value === '') {
    emailVacio.value = true
  } else {
    emailVacio.value = false
    if (!validateFormatEmail(email.value)) {
      emailError.value = true
    } else {
      emailError.value = false
    }
  }

  if (!emailError.value && !passwordError.value && !emailVacio.value && !passwordVacio.value) {
    router.push({name:'home'})
    // Aquí puedes redirigir al usuario a la página de inicio
  }
}

// Función para manejar el registro de usuario
const register = () => {
  if (username.value === '') {
    usernameVacio.value = true
  } else {
    usernameVacio.value = false
    if (!validateFormatUsername(username.value)) {
      usernameError.value = true
    } else {
      usernameError.value = false
    }
  }
  if (email.value === '') {
    emailVacio.value = true
  } else {
    emailVacio.value = false
    if (!validateFormatEmail(email.value)) {
      emailError.value = true
    } else {
      emailError.value = false
    }
  }
  if(password.value===''){
    passwordVacio.value=true
  }else{
    passwordVacio.value=false
  }

  if (!usernameVacio.value && !usernameError.value && !emailError.value && !emailVacio.value ) {
    showPopup.value = true
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

    <!-- Izquierda - Información de la aplicación -->
    <div class="w-1/2 flex flex-col justify-center px-8 leftContent bg-black text-white dark:bg-gray-800">
      <!-- Contenedor de la imagen, el título y la descripción -->
      <div class="flex flex-col items-center mb-8">
        <h1 class="text-4xl font-bold mb-4 dark:text-gray-900">Bienvenido a CodeSnap</h1>
        <img src="/public/logo.jpg" alt="Descripción de la imagen" class="w-40 h-40 mb-4" />
        <p class="text-lg text-center dark:text-gray-900">Descubre una plataforma para desarrolladores donde puedes compartir tus ideas, código y experiencias de manera fácil y rápida.</p>
      </div>
    </div>

    <!-- Derecha - Formulario de inicio de sesión o registro -->
    <div class="w-1/2 flex justify-center items-center dark:bg-white bg-gray-900">
      <!-- Contenedor del formulario -->

      <div class="max-w-md w-full">
        <h2 class="font-bold text-white dark:text-gray-900 text-4xl">
          {{ loginVisible ? 'INICIAR SESIÓN' : 'REGISTRO' }}
        </h2>
        <!-- Darkmode Button -->
        <button @click="toggleDark()" class="text-gray-800 focus:outline-none absolute top-4 right-4 bg-gray-200 rounded-lg px-3 py-1">
          <i class="mr-2" :class="[isDark ? 'bx-moon' : 'bx-sun']"></i>
          <span v-if="isDark">☀️</span>
          <span v-else>🌙</span>
        </button>

        <!-- Formulario de inicio de sesión -->
        <form id="login-form" class="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4" :class="{ hidden: !loginVisible }" @submit.prevent="login">
          <!-- Campos de inicio de sesión -->
          <div class="mb-4">
            <label>
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-700 dark:text-white text-sm font-bold mb-2">Email</span>
              <input type="email" class="dark:bg-gray-600 dark:text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" v-model="email" placeholder="Email" />
              <p v-if="emailError" class="mt-2 text-pink-600 text-sm">Por favor, introduce un email válido.</p>
              <p v-if="emailVacio" class="mt-2 text-pink-600 text-sm">Este campo es obligatorio.</p>
            </label>
          </div>
          <div class="mb-6">
            <label>
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-700 dark:text-white text-sm font-bold mb-2">Contraseña</span>
              <input type="password" class="dark:bg-gray-600 dark:text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" v-model="password" placeholder="Password" />
              <p v-if="passwordError" class="mt-2 text-pink-600 text-sm">Contraseña incorrecta.</p>
              <p v-if="passwordVacio" class="mt-2 text-pink-600 text-sm">Este campo es obligatorio.</p>
            </label>
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Iniciar Sesión</button>
          </div>
        </form>

        <!-- Formulario de registro -->
        <form id="register-form" class="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4" :class="{ hidden: loginVisible }" @submit.prevent="register">
          <!-- Campos de registro -->
          <div class="mb-4">
            <label>
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-700 dark:text-white text-sm font-bold mb-2">Username</span>
              <input type="text" class="dark:bg-gray-600 dark:text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="username" v-model="username" placeholder="Username" />
              <p v-if="usernameError" class="mt-2 text-pink-600 text-sm">Solo se permiten números y letras.</p>
              <p v-if="usernameVacio" class="mt-2 text-pink-600 text-sm">Este campo es obligatorio.</p>
            </label>
          </div>
          <div class="mb-4">
            <label>
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-700 dark:text-white text-sm font-bold mb-2">Email</span>
              <input type="email" class="dark:bg-gray-600 dark:text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" v-model="email" placeholder="Email" />
              <p v-if="emailError" class="mt-2 text-pink-600 text-sm">Por favor, introduce un email válido.</p>
              <p v-if="emailVacio" class="mt-2 text-pink-600 text-sm">Este campo es obligatorio.</p>
            </label>
          </div>
          <div class="mb-24">
            <label>
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-700 dark:text-white text-sm font-bold mb-2">Email</span>
              <Password v-model="password" toggleMask placeholder="Password" />
              <p v-if="passwordVacio" class="mt-2 text-pink-600 text-sm">Este campo es obligatorio.</p>
            </label>
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Registrarse</button>
          </div>
        </form>

        <!-- Botón de cambio entre Login y Registro -->
        <div class="flex items-center justify-center mt-6">
          <button id="toggle-form" class="text-sm text-white hover:underline focus:outline-none" type="button" @click="toggleForm">
            {{ toggleButtonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Agrega estilos CSS personalizados aquí si es necesario */
</style>
