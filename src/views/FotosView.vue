<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import { useRouter, type Router } from 'vue-router';

const URL_Backend = import.meta.env.VITE_URL_BACKEND;
const { cookies } = useCookies();
const token: string = cookies.get('token');
const photos = ref<any[]>([]);
const idUserActual = ref<string>(''); // Asegúrate de que idUserActual esté inicializado

const router: Router = useRouter();

const getIDUser = async (): Promise<void> => {
  try {
    const response = await axios.get(`${URL_Backend}user?token=${token}`, {headers: { 'api-key': `${token}` }})
    idUserActual.value = response.data.users[0].id
  } catch (e) {
    console.log(e)
  }
}
const obtenerFotos = async () => {
  try {
    const response = await axios.get(`${URL_Backend}photo`, { headers: { 'api-key': token } });
    photos.value = response.data.photos;
    for (const photo of photos.value) {
      const likeResponse = await axios.get(`${URL_Backend}like?idPhoto=${photo.id}`, { headers: { 'api-key': token } });
      const userLike = likeResponse.data.likes.find((like: any) => like.idUser === idUserActual.value);
      if (userLike) {
        photo.liked = true;
        photo.likeId = userLike.id;
      } else {
        photo.liked = false;
        photo.likeId = null;
      }
      photo.likes = likeResponse.data.likes.length;
      const ownerResponse = await axios.get(`${URL_Backend}user?id=${photo.idUser}`, { headers: { 'api-key': token } });
      photo.owner = ownerResponse.data.users[0];
    }
  } catch (error) {
    console.error('Error al obtener las fotos:', error);
  }
};

const toggleHeart = async (photoId: string) => {
  const photo = photos.value.find((p) => p.id === photoId);
  console.log(idUserActual.value); // Verifica que idUserActual tenga un valor válido
  if (photo) {
    try {
      if (!photo.liked) {
        console.log('like');
        const response = await axios.post(`${URL_Backend}like`, { idPhoto: photoId, idUser: idUserActual.value }, { headers: { 'api-key': token } });
        console.log(response.data);
        photo.likes += 1;
        photo.likeId = response.data.id;
      } else {
        console.log('unlike');
        if (photo.likeId) {
          await axios.delete(`${URL_Backend}like?id=${photo.likeId}`, { headers: { 'api-key': token } });
        }
        photo.likes -= 1;
        photo.likeId = null;
      }
      photo.liked = !photo.liked;
    } catch (error) {
      console.error('Error al cambiar el estado del like:', error);
      const errorMessage = ref<string>('');
      errorMessage.value = (error as any).response?.data?.message || 'Error desconocido al cambiar el estado del like';
    }
  }
};

const goToProfile = (userId: string): void => {
  if (idUserActual.value !== userId) {
    router.push({ name: 'profile', params: { id: userId } });
  } else {
    router.push({ name: 'profile' });
  }
};

onMounted(() => {
    getIDUser();
  obtenerFotos();
});
</script>

<template>
    <div id="content-wrap" class="bg-stone-200 dark:bg-stone-800">
      <div class="photos-container">
        <div v-for="photo in photos" :key="photo.id" class="photo-card">
          <div class="photo-header">
            <img class="profile-pic" :src="photo.owner.profilePicture?photo.owner.profilePicture:'/usuario.png'" alt="profile"
              @click="goToProfile(photo.idUser)" style="cursor: pointer" />
            <span class="username" @click="goToProfile(photo.idUser)" style="cursor: pointer">
              {{ photo.owner ? photo.owner.username : 'Anonymous' }}
            </span>
          </div>
          <div class="photo-body">
            <img :src="photo.photo" alt="Foto" class="photo-img" />
          </div>
          <div class="photo-footer">
            <div class="heart-btn">
              <div class="content" @click="toggleHeart(photo.id)">
                <span :class="{ 'heart': true, 'heart-active': photo.liked }"></span>
                <span class="numb">Likes:{{ photo.likes }}</span>
              </div>
            </div>
            <p class="description">{{ photo.description }}</p>
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

.numb {
    font-size: 21px;
    margin-left: 7px;
    font-weight: 600;
    color: #9C9496;
    font-family: sans-serif;
}

.numb.heart-active {
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

.photos-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
    padding: 20px;
}

.photo-card {
    flex: 1 1 calc(33.333% - 32px);
    /* 3 items per row with space */
    max-width: calc(33.333% - 32px);
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    background-color: #fff;
}

.photo-header {
    display: flex;
    align-items: center;
    padding: 10px;
    background: #f8f8f8;
}

.profile-pic {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.username {
    margin-left: 10px;
    font-weight: bold;
}

.photo-body {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

.photo-img {
    width: 100%;
    height: auto;
}

.photo-footer {
    padding: 10px;
    background: #f8f8f8;
}

.like-section {
    display: flex;
    align-items: center;
}

.description {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
}
</style>