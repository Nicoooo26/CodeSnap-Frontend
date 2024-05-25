<script setup lang="ts">
import { useCookies } from 'vue3-cookies';
import { useRouter, type Router } from 'vue-router';

//Usar cookies
const { cookies } = useCookies();

//Variable router
const router:Router = useRouter();

//Control del logout
const handleLogout = ():void => {
  cookies.remove('token');
  router.push({ name: 'login' });
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-stone-600">
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 max-w-md mx-auto text-center">
      <h1 class="text-4xl font-extrabold text-gray-800 dark:text-white mb-6">Cuenta Bloqueada</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Su cuenta ha sido bloqueada por un administrador. Si tiene alguna pregunta o desea más información.<br> Llame al
        <strong class="text-gray-900 dark:text-white">985-042-713</strong>.
      </p>
      <button @click="handleLogout"
        class="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-5 rounded-full shadow-md hover:from-green-500 hover:to-blue-600 transition duration-300 transform hover:-translate-y-1">
        Volver al Inicio de Sesión
      </button>
    </div>
  </div>
</template>