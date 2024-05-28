<script setup lang="ts">
import router from '@/router'
import privacyPolicy from '@/others/privacyPolicy'

//Función para volver atrás
const goBack = (): void => router.go(-1)
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-400 p-4">
    <div class="w-full max-w-xl p-4 sm:p-6 bg-stone-100 dark:bg-stone-800 rounded-lg shadow-lg border border-stone-300 dark:border-stone-700 transition-all duration-500">
      <p>
        {{ privacyPolicy }}
      </p>
    </div>
    <div class="mt-8 w-full flex justify-center">
      <button @click="goBack" class="px-6 py-3 bg-stone-500 dark:bg-stone-800 text-stone-50 dark:text-stone-200 rounded-full shadow-lg hover:bg-stone-500 dark:hover:bg-stone-600 transform hover:scale-105 transition-transform duration-300">Atrás</button>
    </div>
  </div>
</template>


<style scoped></style>
