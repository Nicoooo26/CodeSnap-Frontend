<script setup lang="ts">
import router from '@/router';
import privacyPolicy from '@/others/privacyPolicy';

const goBack = () => {
  console.log(router)
  router.go(-1);
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-stone-400 dark:bg-stone-700 text-stone-400 dark:text-stone-400">
    <div class="p-6 max-w-xl bg-stone-100 dark:bg-stone-800 rounded-lg shadow-lg border border-stone-300 dark:border-stone-700 transition-all duration-500">
      <p>
        {{ privacyPolicy }}
      </p>
    </div>
    <div class="mt-8">
      <button @click="goBack"
        class="px-6 py-3 bg-stone-500 dark:bg-stone-800 text-stone-50 dark:text-stone-200 rounded-full shadow-lg hover:bg-stone-500 dark:hover:bg-stone-600 transform hover:scale-105 transition-transform duration-300">
        Atrás
      </button>
    </div>
  </div>
</template>

<style scoped></style>