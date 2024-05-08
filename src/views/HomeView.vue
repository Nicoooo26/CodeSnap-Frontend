<script setup lang="ts">
import { useTokenStore } from '@/storage/store';
import axios from 'axios';

const storeToken = useTokenStore()
const token = storeToken.getToken


// Hacer la solicitud utilizando Axios
axios.get(`http://localhost/DWES/CodesnapBackend/CodeSnapBackEnd/user?token=${token}`, {headers:{'api-key':`${token}`} })
  .then(response => {
    // Manejar la respuesta aquí
  })
  .catch(error => {
    // Manejar errores aquí
    console.error('Error:', error);
  });   

</script>

<template>
    <div>
        <h1>HOME</h1>
        <h2>{{ storeToken.getToken }}</h2>
    </div>
</template>

<style lang="scss" scoped>

</style>