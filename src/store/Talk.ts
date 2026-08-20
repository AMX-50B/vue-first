import {defineStore} from 'pinia'
import {ref} from 'vue'

interface Talk{
    id:string,
    message:string
}

export const userTalkStore = defineStore('talks',()=>{
    // state
    const talks = ref<Talk[]>(JSON.parse(localStorage.getItem('talks') || '[]'))
    const id = ref<string>('')
    const name = ref<string>('')

    function addTalk(newTalk:Talk){
        talks.value.push(newTalk)
    }

    return {talks,id,name,addTalk}
})