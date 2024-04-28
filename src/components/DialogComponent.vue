<script setup lang="ts">

import { ref, watch } from 'vue';

const emit = defineEmits(['visible'])
const props = defineProps(['visible'])
const userCopy = ref(false);

watch(
    () => props.visible,
    (newValue, oldValue) => {
        userCopy.value = newValue;
        emit('visible', 'false');
    }
);

const profilePicture = ref('./public/usuario.png')
const username = ref('nico26')
const fechaNacimiento = ref('01/01/2000')
const gender = ref(1)
const phoneNumber = ref('123-456-7890')
const description = ref('Descripción del usuariolalallallalallalal')
const location = ref('Madrid, Spain')
const fullName = ref('Nicolas Guañuna')

</script>


<template>
    <Dialog v-model:visible="userCopy" modal header="Editar perfil" class="w-70">
         <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="flex flex-col items-center space-y-4">
                <div class="relative">
                    <img class="w-20 h-20 md:w-40 md:h-40 border rounded-full p-1" :src="profilePicture"
                        alt="profile" />
                </div>
                <div class="flex space-x-4">
                    <input type="file" id="fileInput" class="hidden" accept="image/*">
                    <label for="fileInput"
                        class="px-4 py-2 rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-600 focus:outline-none transition-colors">
                        Cambiar foto
                    </label>

                    <input type="button" id="borrarFoto"/>
                    <label for="borrarFoto"
                        class="px-4 py-2 rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-600 focus:outline-none transition-colors">
                        Eliminar foto
                    </label>
                </div>
            </div>
            <div class="flex flex-col justify-center space-y-5">
                <input type="text" placeholder="Username" class="border p-2 rounded w-full h-10" :value="username">
                <input type="text" placeholder="Nombre Completo" class="border p-2 rounded w-full h-10"
                    :value="fullName">
            </div>
        </div>
        <div class="flex gap-4 mb-6">
            <input type="date" placeholder="Fecha de nacimiento" :value="fechaNacimiento"
                class="border p-2 rounded w-1/4">
            <input type="text" placeholder="Location" :value="location" class="border p-2 rounded w-1/4">
            <input type="text" placeholder="Teléfono" :value="phoneNumber" class="border p-2 rounded w-1/4">
            <input type="text" placeholder="Genero" :value="gender" class="border p-2 rounded w-1/4">
        </div>
        <div class="mb-4">
            <textarea placeholder="Descripcion" :value="description" class="border p-2 rounded w-full"></textarea>
        </div>
        <div class="flex justify-end">
            <button type="button" id="theme-toggle"
                class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors mr-2">
                Guardar cambios
            </button>
            <button type="button" id="cancelar"
                class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors">
                Cancelar
            </button>
        </div>
    </Dialog>
</template>

<style scoped></style>