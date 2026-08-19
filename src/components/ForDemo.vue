<template>
    <div>
       <ul>
            <li v-for="(item,index) in items" :key="item.id" @click="itemClick(this)">index:{{index}}-name:{{item.name}}-age:{{ item.age }}</li>
       </ul>
    </div>
   
</template>
<script setup>
import { ref } from 'vue';

function itemClick(d){
    console.log(d)
}
const items = ref([
    {id:1,name:'刘安鑫',age:2},
    {id:2,name:'刘安然',age:2}
    ])
</script>
<style scoped>
</style>