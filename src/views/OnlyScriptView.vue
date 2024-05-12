<script setup lang="ts">
import { useCookies } from 'vue3-cookies';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const { cookies } = useCookies();
const token = cookies.get('token');

const code = ref('');

axios.get('http://localhost/DWES/CodesnapBackend/CodeSnapBackEnd/scripts?id=10', {
            headers: { 'api-key': `${token}` }
        })
        .then(response=>{
            console.log( response.data.scripts[0].code)
            code.value = atob(response.data.scripts[0].code);
        })
        .catch(error=>{
            console.log(error)
        })

</script>

<template>
      <pre >{{ code }}</pre> 
  </template>
  
  <style scoped>
 
  </style>
  