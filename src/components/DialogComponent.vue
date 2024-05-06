<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits(['cerrar'])
const profilePicture = ref('usuario.png')
const username = ref('nico26')
const fechaNacimiento = ref('2000-01-01')
const gender = ref(1)
const phoneNumber = ref('123-456-7890')
const description = ref('Descripción del usuariolalallallalallalal')
const location = ref('Madrid, Spain')
const fullName = ref('Nicolas Guañuna')
</script>

<template>
  <div class="modal w-70">
    <div class="modal-content">
      <h2 class="text-xl font-semibold mb-4">Editar Perfil</h2>
      <span class="close" @click="emits('cerrar')">&times;</span>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="flex flex-col items-center space-y-4">
          <div class="relative">
            <img class="w-20 h-20 md:w-40 md:h-40 border rounded-full p-1" :src="profilePicture" alt="profile" />
          </div>
          <div class="flex space-x-4">
            <input type="file" id="fileInput" class="hidden" accept="image/*" />
            <label for="fileInput" class="px-4 py-2 rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-600 focus:outline-none transition-colors"> Cambiar foto </label>

            <input type="button" id="borrarFoto" />
            <label for="borrarFoto" class="px-4 py-2 rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-600 focus:outline-none transition-colors"> Eliminar foto </label>
          </div>
        </div>
        <div class="flex flex-col justify-center space-y-5">
          <input type="text" placeholder="Username" class="border p-2 rounded w-full h-10" :value="username" />
          <input type="text" placeholder="Nombre Completo" class="border p-2 rounded w-full h-10" :value="fullName" />
        </div>
      </div>
      <div class="flex gap-4 mb-6">
        <input type="date" placeholder="Fecha de nacimiento" :value="fechaNacimiento" class="border p-2 rounded w-1/4" />
        <input type="text" placeholder="Location" :value="location" class="border p-2 rounded w-1/4" />
        <input type="text" placeholder="Teléfono" :value="phoneNumber" class="border p-2 rounded w-1/4" />
        <input type="text" placeholder="Genero" :value="gender" class="border p-2 rounded w-1/4" />
      </div>
      <div class="mb-4">
        <textarea placeholder="Descripcion" :value="description" class="border p-2 rounded w-full"></textarea>
      </div>
      <div class="flex justify-end">
        <button type="button" id="theme-toggle" class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors mr-2">Guardar cambios</button>
        <button type="button" id="cancelar" class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors" @click="emits('cerrar')">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    position: relative; /* Agregamos esta línea */
  }
  
  .close {
    color: #000000;
    position: absolute; /* Cambiamos a posición absoluta */
    font-size: 30px; /* Modificamos el tamaño del icono de cierre */
    cursor: pointer;
    right: 15px; /* Lo ubicamos a 15px de la derecha del modal */
    top: 15px; /* Lo ubicamos a 15px del borde superior del modal */
  }
  
  .close:hover,
  .close:focus {
    color: rgb(255, 0, 0);
    text-decoration: none;
    cursor: pointer;
  }
</style>
