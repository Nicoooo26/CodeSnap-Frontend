<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router';
import axios from 'axios';
import { useCookies } from 'vue3-cookies';

// Ruta del backend desde variables de entorno
const URL_Backend = import.meta.env.VITE_URL_BACKEND

// Obtener token de cookies
const { cookies } = useCookies()
const token: string = cookies.get('token')

const route:RouteLocationNormalizedLoaded = useRoute()
const photoId:string|string[] = route.params.id 

// Refs para almacenar los datos de la foto
const photos = ref<any[]>([]); // Cambiado a un array de fotos

const obtenerFotos = async () => {
  try {
    const response = await axios.get(`${URL_Backend}photo?id=${photoId}`, { headers: { 'api-key': token } });
    photos.value = response.data.photos;
  } catch (error) {
    console.error('Error al obtener las fotos:', error);
  }
};

const cargarDatos = async () => {
  await obtenerFotos();
};
onMounted(cargarDatos);
const toggleHeart = (photoId: string) => {
  const photo = photos.value.find((p) => p.id === photoId);
  if (photo) {
    photo.liked = !photo.liked;
    $('.content').toggleClass("heart-active")
    $('.text').toggleClass("heart-active")
    $('.numb').toggleClass("heart-active")
    $('.heart').toggleClass("heart-active")
  }
};

</script>

<template>
  <div class="container">
    <div v-for="photo in photos" :key="photo.id" class="photo-wrapper">
      <div class="selected-photo">
        <img :src="photo.photo" alt="Foto seleccionada" class="photo" />
      </div>
      <div class="details">
        <div class="description">
          <p>{{ photo.description }}</p>
        </div>
        <div class="heart-btn">
          <div class="content" @click="toggleHeart(photo.id)">
            <span :class="{ 'heart': true, 'heart-active': photo.liked }"></span>
            <span class="text">Like</span>
            <span class="numb"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:600&display=swap');
.heart-btn{
  position: absolute;
  left:41%;
  top: 60%;
  transform: translate(-50%,-50%);
}
.content{
  padding: 13px 16px;
  display: flex;
  border: 2px solid #eae2e1;
  border-radius: 5px;
  cursor: pointer;
}
.content.heart-active{
  border-color: #f9b9c4;
  background: #fbd0d8;
}
.heart{
  position: absolute;
  background: url("/like.png") no-repeat;
  background-position: left;
  background-size: 2900%;
  height: 90px;
  width: 90px;
  top: 50%;
  left: 21%;
  transform: translate(-50%,-50%);
}
.text{
  font-size: 21px;
  margin-left: 30px;
  color: grey;
  font-family: 'Montserrat',sans-serif;
}
.numb:before{
  content: '12';
  font-size: 21px;
  margin-left: 7px;
  font-weight: 600;
  color: #9C9496;
  font-family: sans-serif;
}
.numb.heart-active:before{
  content: '13';
  color: #000;
}
.text.heart-active{
  color: #000;
}
.heart.heart-active{
  animation: animate .8s steps(28) 1;
  background-position: right;
}
@keyframes animate {
  0%{
    background-position: left;
  }
  100%{
    background-position: right;
  }
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
}

.photo-wrapper {
  display: flex;
  align-items: center;
}

.selected-photo {
  flex: 1;
  margin-right: 20px;
}

.photo {
  width: 100%;
  height: auto;
  border-radius: 10px; /* Añadido para redondear la foto */
}

.details {
  flex: 2;
  display: flex;
  flex-direction: column;
}

.description {
  margin-bottom: 10px;
}
</style>