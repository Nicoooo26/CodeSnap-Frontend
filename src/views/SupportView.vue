<script setup lang="ts">
import { ref } from 'vue';

const email = ref('example@gmail.com');
const comment = ref('');

</script>

<template>
    <div class="flex justify-center items-center h-screen">
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md">
        <h1 class="text-3xl font-bold mb-8 text-center">SOPORTE</h1>
        <form action="https://formsubmit.co/aee7f2e885637d6dfa095d7b2ae45646" method="POST">
          <div class="mb-4">
            <label for="username" class="block text-gray-700 font-bold mb-2">{{email}}<br> Deje su comentario para que podamos ayudarle.</label>
            <input type="text" hidden v-model="email" id="email" name="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-6">
            <label for="comment" class="block text-gray-700 font-bold mb-2">Comentario:</label>
            <textarea v-model="comment" id="comment" name="comment" placeholder="Enter your comment" rows="5" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
          </div>
          <div class="flex items-center justify-center">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Enviar</button>
          </div>

          <!-- Configuración para eliminar el captcha y redirigir a la página actual -->
          <input type="hidden" name="_next" value="http://localhost:5173/FCTProject/soporte">
          <input type="hidden" name="_captcha" value="false">
          <input type="hidden" name="_template" value="table">
          <input type="hidden" name="_subject" value="¡Nuevo envío!">

        </form>
      </div>
    </div>
  </template>

  <style scoped>

  </style>
  