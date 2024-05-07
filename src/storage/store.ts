import { defineStore } from "pinia";
import { ref,computed } from "vue";

export const useTokenStore = defineStore('token',()=>{
    //El estado
    const token = ref('')
    //Los getters
    const getToken = computed(()=>token.value)
    //Las acciones
    const deleteToken=()=>token.value=''
    const saveToken=(tokenP:string)=>token.value=tokenP

    return {
        getToken,
        deleteToken,
        saveToken
    }
})