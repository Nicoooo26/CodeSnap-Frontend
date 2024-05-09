<script setup lang="ts">
import axios from 'axios';
import { useCookies } from 'vue3-cookies';

const {cookies} = useCookies()
const token = cookies.get('token')

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
        <h2>{{ cookies.get('token') }}</h2>
    </div>
</template>

<style lang="scss" scoped>

</style>