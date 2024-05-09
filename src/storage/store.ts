import { defineStore } from "pinia";
import { ref,computed } from "vue";

export const useDatosUserStore = defineStore('datosUser',()=>{
    //El estado
    const datosUser = ref()
    //Los getters
    const getToken = computed(()=>datosUser.value)
    //Las acciones
    const deleteUser=()=>datosUser.value={}
    const saveUser=(user:any)=>datosUser.value=user

    return {
        datosUser,
        getToken,
        deleteUser,
        saveUser
    }
})