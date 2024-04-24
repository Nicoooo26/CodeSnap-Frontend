<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
    <div>
        <AppHeader />
        <RouterView />
        <AppFooter />
    </div>
</template>

<style scoped>

</style>