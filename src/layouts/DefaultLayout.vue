<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue'

</script>

<template>
    <div id="page-container">
        <AppHeader />
        <RouterView id="content-wrap" />
        
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
  height: 5.5rem;
}
</style>