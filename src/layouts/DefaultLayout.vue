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
}

#content-wrap {
  padding-bottom: 2.5rem;  
}

#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 5.5rem;    
}
</style>