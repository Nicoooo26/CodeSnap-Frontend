<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router';
import axios from 'axios';
import { useCookies } from 'vue3-cookies';

// Ruta del backend desde variables de entorno
const URL_Backend = import.meta.env.VITE_URL_BACKEND

// Obtener token de cookies
const { cookies } = useCookies()
const token: string = cookies.get('token')

const route: RouteLocationNormalizedLoaded = useRoute()
const photoId: string | string[] = route.params.id

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
const data = ref<any>({})
const loading = ref<boolean>(true)
const getDataUser = async (userId?: string): Promise<void> => {
  try {
    const endpoint = userId ? `${URL_Backend}user?id=${userId}` : `${URL_Backend}user?token=${token}`
    const response = await axios.get(endpoint, { headers: { 'api-key': `${token}` } })
    data.value = response.data.users[0]
    // Si no hay imagen de perfil, usa una por defecto
    data.value.profilePicture = data.value.profilePicture ? data.value.profilePicture : '/FCTProject/public/usuario.png'
    loading.value = false
  } catch (e) {
    console.log(e)
    loading.value = false
  }
}

// Se ejecuta al montar el componente
onMounted(() => {
  loading.value = true
  const userId = route.params.userId as string | undefined
  getDataUser(userId) // Obtiene los datos del usuario
})

// Observa cambios en el ID del usuario
watch(
  () => route.params.userId,
  (newId: any) => {
    loading.value = true
    getDataUser(newId) // Obtiene los datos del usuario
  }
)
const isCurrentUser = computed(() => !route.params.userId)
const eliminarFoto = async (photoId: string) => {
  try {
    await axios.delete(`${URL_Backend}photo?id=${photoId}`, { headers: { 'api-key': `${token}` } });
    // Eliminar la foto del array local de fotos
    photos.value = photos.value.filter(photo => photo.id !== photoId);
  } catch (error) {
    console.error('Error al eliminar la foto:', error);
  }
}
</script>

<template>
  <div class="container">
    <div v-for="photo in photos" :key="photo.id" class="photo-wrapper">
      <div class="details-top">
        <div class="profile-picture-wrapper md:w-3/12 md:ml-16">
          <img class="profile-picture" :src="data.profilePicture" alt="profile" />
          <p class="username">{{ data.username }}</p>
          <div class="button-container">
            <button v-if="isCurrentUser" @click="eliminarFoto(photo.id)" class="delete-btn"><svg
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash"
                viewBox="0 0 16 16">
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg></button>
          </div>
        </div>

      </div>
      <div class="selected-photo">
        <img :src="photo.photo" alt="Foto seleccionada" class="photo" />
      </div>
      <div class="details-bottom">
        <div class="heart-btn">
          <div class="content" @click="toggleHeart(photo.id)">
            <span :class="{ 'heart': true, 'heart-active': photo.liked }"></span>
            <span class="numb"></span>
          </div>
        </div>
        <div class="description">
          <p>{{ photo.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:600&display=swap');

.heart-btn {
  display: flex;
  align-items: center;
}

.content {
  padding-right: 5px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
}

.content.heart-active {
  border-color: #f9b9c4;
  background: #fbd0d8;
}

.heart {
  background: url("/like.png") no-repeat;
  background-position: left;
  background-size: 2900%;
  height: 40px;
  width: 50px;
}

.text {
  font-size: 21px;
  margin-left: 10px;
  color: grey;
  font-family: 'Montserrat', sans-serif;
}

.numb:before {
  content: '12';
  font-size: 21px;
  margin-left: 7px;
  font-weight: 600;
  color: #9C9496;
  font-family: sans-serif;
}

.numb.heart-active:before {
  content: '13';
  color: #000;
}

.text.heart-active {
  color: #000;
}

.heart.heart-active {
  animation: animate .8s steps(28) 1;
  background-position: right;
}

@keyframes animate {
  0% {
    background-position: left;
  }

  100% {
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
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.details-top {
  padding: 10px;
  background: #fff;
  width: 100%;
  text-align: center;
}

.username {
  padding-left: 10px;
  font-weight: bold;
  font-size: 16px;
}

.selected-photo img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.details-bottom {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #fff;
}

.description {
  margin-left: 10px;
  font-size: 14px;
  color: #666;
  flex: 1;
}

.profile-picture-wrapper {
  padding-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
  /* Se mantiene para pantallas medianas */
}

.profile-picture {
  width: 40px;
  /* Tamaño pequeño para dispositivos móviles */
  height: 40px;
  object-fit: cover;
  border: 2px solid #ccc;
  /* Borde claro para imagen */
  border-radius: 50%;
  /* Hace la imagen redonda */
  padding: 2px;
  transition: width 0.3s, height 0.3s;
  /* Transición para un efecto suave al cambiar de tamaño */
}

@media (min-width: 768px) {
  .profile-picture {
    width: 60px;
    /* Tamaño más grande para pantallas medianas en adelante */
    height: 60px;
  }
}

@media (max-width: 431px) {
  .content {
    width: 75px;
  }
}
</style>
