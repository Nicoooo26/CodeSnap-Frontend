<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { FilterMatchMode } from 'primevue/api'
import { useCookies } from 'vue3-cookies'

// Ruta del backend desde variables de entorno
const URL_Backend = import.meta.env.VITE_URL_BACKEND

// Obtener token de cookies
const { cookies } = useCookies()
const token: string = cookies.get('token')

const users = ref([])
const loading = ref(true)

const getUsers = async () => {
  try {
    const response = await axios.get(`${URL_Backend}user`, {
      headers: { 'api-key': `${token}` }
    })
    users.value = response.data.users
    loading.value = false
  } catch (e) {
    console.log(e)
    loading.value = false
  }
}

const blockUser = async (id: number) => {
  loading.value=true
    try {
    await axios.put(`${URL_Backend}user?id=${id}`, { blocked: 1 }, { headers: { 'api-key': `${token}` } })
    getUsers()
  } catch (e) {
    console.log(e)
  }
}

const unblockUser = async (id: number) => {
  loading.value=true
  try {
    await axios.put(`${URL_Backend}user?id=${id}`, { blocked: 0 }, { headers: { 'api-key': `${token}` } })
    getUsers()
  } catch (e) {
    console.log(e)
  }
}

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  email: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})

onMounted(() => {
  getUsers()
})
</script>

<template>
  <div class="bg-stone-200 dark:bg-stone-800">
    <div class="container mx-auto p-4">
      <h1 class="text-4xl font-bold text-center mb-4 dark:text-stone-200 text-stone-800">Admin - Gestión de Usuarios</h1>
      <div class="card mt-20">
        <DataTable v-model:filters="filters" :value="users" paginator removableSort :rows="5" dataKey="id" filterDisplay="row" :globalFilterFields="['username', 'id', 'email']" >
          <template #header>
            <div class="flex justify-end mb-4">
              <div class="relative w-full md:w-1/2 lg:w-1/3">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i class="pi pi-search text-gray-400"></i>
                </span>
                <InputText v-model="filters.global.value" placeholder="Buscar" class="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-stone-400 focus:outline-none focus:border-stone-900 transition duration-200" />
              </div>
            </div>
          </template>

          <template #empty> No se encontraron usuarios. </template>
          <Column field="id" header="ID" sortable style="min-width: 6rem"></Column>
          <Column field="username" header="Username" sortable style="min-width: 12rem">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Buscar por username" />
            </template>
          </Column>
          <Column field="email" header="Email" sortable style="min-width: 12rem">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Buscar por email" />
            </template>
          </Column>
          <Column field="dateCreated" header="Fecha de Creación" sortable style="min-width: 12rem">
            <template #body="{ data }">
              {{ new Date(data.dateCreated).toLocaleDateString() }}
            </template>
          </Column>
          <Column header="Acciones" style="min-width: 12rem">
            <template #body="{ data }">
              <Button v-if="data.blocked == 0" label="Bloquear cuenta" icon="pi pi-lock" class="p-button-danger text-red-600" @click="blockUser(data.id)" />
              <Button v-else label="Desbloquear cuenta" icon="pi pi-unlock" class="p-button-success text-green-600" @click="unblockUser(data.id)" />
            </template>
          </Column>
        </DataTable>
      </div>
      <div v-if="loading" class="loading-overlay">
        <ProgressSpinner />
      </div>
    </div>
  </div>
</template>

<style scoped>

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(25, 24, 24, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
