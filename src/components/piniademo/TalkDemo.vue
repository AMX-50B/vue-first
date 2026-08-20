<template>
    <div>
       <ul>
           
            <li v-for="(item) in talkStore.talks" :key="item.id">{{ item.message }}</li>
       </ul>
    </div>
    <button @click="getMore">getMore</button>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import {nanoid} from 'nanoid'
import { userTalkStore } from '@/store/Talk'
import { storeToRefs } from 'pinia'

// 引入 pinia 的 store 它会返回一个函数，调用这个函数就会返回 store 的实例对象 对象是ref
const talkStore = userTalkStore()
// 通过 storeToRefs 可以将 store 中的 state 转换为 ref 对象
const { talks,id,name } = storeToRefs(talkStore)
async function getMore(){
    // 对象解构
    let { data:{results:e} } = await axios.get('https://randomuser.me/api/?inc=email');
    let newItem = {id:nanoid(),message:e[0].email}
    // 1. pinia 的 store 中的 state 是响应式的，直接修改就可以了
    talkStore.talks.push(newItem)
    // 也可以调用 store 中定义的 action 来修改 state
    // talkStore.addTalk(newItem);
}
// 2. pinia 提供了 $patch 方法可以批量修改 state 中的属性
talkStore.$patch({
    id:nanoid(),
    name:'张三'
})
// 3. pinia 提供了 $subscribe 方法可以监听 state 的变化 类似 watch
talkStore.$subscribe((mutation,state)=>{
    localStorage.setItem('talks',JSON.stringify(state.talks))
})
</script>
<style scoped>
</style>