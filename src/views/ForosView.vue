<script setup lang="ts">
import CrearForoComponent from '@/components/CrearForoComponent.vue';
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
    <div>
        <button @click="abrirModal"
            class="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-md mt-5">Crear
            Foro</button>

        <div class=" mb-14 ml-4 mr-4 mt-5 grid grid-cols-3 gap-4 ">
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
                <img class="object-cover w-full h-60" src="/programacionIcons/phpIcon.png" alt="" />
                <div class="p-5">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">FORO PHP</h5>
                    <RouterLink to="/foros/php">
                        <button
                            class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Entrar</button>

                    </RouterLink>
                </div>
            </div>
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
                <img class="object-cover w-full h-60" src="/programacionIcons/javaIcon.png" alt="" />
                <div class="p-5">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">FORO JAVA</h5>
                    <RouterLink to="/foros/java">
                        <button
                            class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Entrar</button>

                    </RouterLink>
                </div>
            </div>
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
                <img class="object-cover w-full h-60" src="/programacionIcons/jsIcon.png" alt="" />
                <div class="p-5">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">FORO JAVASCRIPT</h5>
                    <RouterLink to="/foros/javascript">
                        <button
                            class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Entrar</button>

                    </RouterLink>
                </div>
            </div>
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
                <img class="object-cover w-full h-60" src="/programacionIcons/cIcon.png" alt="" />
                <div class="p-5">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">FORO C++</h5>
                    <RouterLink to="/foros/c++">
                        <button
                            class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Entrar</button>

                    </RouterLink>
                </div>
            </div>
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
                <img class="object-cover w-full h-60" src="/programacionIcons/htmlIcon.png" alt="" />
                <div class="p-5">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">FORO HTML</h5>
                    <RouterLink to="/foros/html">
                        <button
                            class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Entrar</button>

                    </RouterLink>
                </div>
            </div>
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
                <img class="object-cover w-full h-60" src="/programacionIcons/phytonIcon.png" alt="" />
                <div class="p-5">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">FORO PHYTON</h5>
                    <RouterLink to="/foros/phyton">
                        <button
                            class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Entrar</button>

                    </RouterLink>
                </div>
            </div>
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
                <img class="object-cover w-full h-60" src="/programacionIcons/sqlIcon.png" alt="" />
                <div class="p-5">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">FORO SQL</h5>
                    <RouterLink to="/foros/sql">
                        <button
                            class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Entrar</button>

                    </RouterLink>
                </div>
            </div>
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
                <img class="object-cover w-full h-60" src="/programacionIcons/cssIcon.png" alt="" />
                <div class="p-5">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">FORO CSS</h5>
                    <RouterLink to="/foros/css">
                        <button
                            class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Entrar</button>

                    </RouterLink>
                </div>
            </div>
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
                <img class="object-cover w-full h-60" src="/programacionIcons/rustIcon.png" alt="" />
                <div class="p-5">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">FORO RUST</h5>
                    <RouterLink to="/foros/rust">
                        <button
                            class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Entrar</button>
                    </RouterLink>
                </div>
            </div>
        </div>
        <CrearForoComponent v-if="mostrarModal" @cerrar="controlarEmit" />
    </div>

</template>

<style scoped></style>