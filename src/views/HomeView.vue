<script setup lang="ts">
import { useTokenStore } from '@/storage/store';
import axios from 'axios';

const storeToken = useTokenStore()
const token = storeToken.getToken
// Configurar el token en el header de la solicitud
const headers = {
  'Authorization': `Bearer ${token}`
};

// Hacer la solicitud utilizando Axios
axios.get('http://localhost/DWES/CodeSnapBackEnd/user', { headers })
  .then(response => {
    // Manejar la respuesta aquí
    console.log(response.data);
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