<template>
    <div>
      <img :src="photoUrl" alt="photo" />
      <div>
        <p>{{ likes }} likes</p>
        <p>{{ description }}</p>
      </div>
      <div>
        <h2>Comentarios</h2>
        <div v-for="comment in comments" :key="comment.id">
          <p>{{ comment.text }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  let photoUrl = ref('');
  let likes = ref(0);
  let description = ref('');
  let comments = ref([]);
  </script>