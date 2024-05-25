<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue'

</script>

<template>
  <div id="page-container" class="bg-stone-200 dark:bg-stone-800">
    <AppHeader />
    <RouterView id="content-wrap" class="bg-stone-200 dark:bg-stone-800" />
    <AppFooter id="footer" />
  </div>
</template>

<style scoped>
#page-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#content-wrap {
  flex: 1;
  overflow-y: auto;
}


#footer {
  margin-top: auto;
  width: 100%;
  height: 4.5rem;
}
</style>