<script setup lang="ts">
import { ref } from 'vue';

// Referencia reactiva para el email
const email = ref<string>('example@gmail.com');

// Referencia reactiva para el comentario
const comment = ref<string>('');
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-stone-200 dark:bg-stone-800 text-stone-500 dark:text-stone-200">
    <div class="shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 max-w-md bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 transition-all duration-500">
      <h1 class="text-3xl font-bold mb-8 text-center text-stone-600 dark:text-stone-400">SOPORTE</h1>
      <form action="https://formsubmit.co/aee7f2e885637d6dfa095d7b2ae45646" method="POST">
        <div class="mb-4">
          <label for="email" class="block font-bold mb-2">{{ email }}<br> Deje su comentario para que podamos ayudarle.</label>
          <input type="text" hidden v-model="email" id="email" name="email" >
        </div>
        <div class="mb-6">
          <label for="comment" class="block font-bold mb-2">Comentario:</label>
          <textarea v-model="comment" id="comment" name="comment" placeholder="Ingrese su comentario" rows="5" class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"></textarea>
        </div>
        <div class="flex items-center justify-center">
          <button type="submit" class="bg-stone-400 dark:bg-stone-700 text-stone-50 dark:text-stone-200 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-stone-500 dark:hover:bg-stone-600 transform hover:scale-105 transition-transform duration-300">
            Enviar
          </button>
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
#comment{
  resize: none
}
</style>
  