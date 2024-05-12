<script setup lang="ts">
import CrearScriptComponent from '@/components/CrearScriptComponent.vue';
import { ref } from 'vue';

const mostrarModal = ref(false)
const abrirModal = () => {
    mostrarModal.value = true
}
const cerrarModal = () => {
    mostrarModal.value = false
}
const controlarEmit = () => {
    cerrarModal()
}

</script>

<template>
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-4">SCRIPTS</h1>

        <!-- Botón para crear un nuevo script -->
        <button @click="abrirModal"
            class="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-opacity-90">Crear
            Script</button>

        <!-- Sección para mostrar los scripts -->
        <div class="mb-14 ml-4 mr-4 mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Script 1 -->
            <div class="bg-gray-100 p-4 rounded-md cursor-pointer hover:bg-gray-200 transition duration-200 ease-in-out">
                <h2 class="text-xl font-semibold mb-2">Script 1</h2>
                <p>Fecha de creación: 2024-05-12</p>
                <p>Usuario: Usuario1</p>
                <code class="block overflow-hidden whitespace-pre overflow-ellipsis">Linea 1 del código...</code>
                <code class="block overflow-hidden whitespace-pre overflow-ellipsis">Linea 2 del código...</code>
            </div>

        </div>
    </div>
    <CrearScriptComponent v-if="mostrarModal" @cerrar="controlarEmit" />
</template>

<style scoped>
/* Aquí puedes añadir estilos personalizados si es necesario */
</style>
