<template>
    <div>
     <span>传统双向绑定实现</span>
     <h1>name:{{ name }}</h1>
     <input :value="name" @input="inputOn"/>
    </div>
    <div>
        <span>v-model</span>
        <h1>age:{{ age }}</h1>
        <input v-model.lazy.trim="age"/>
    </div>
   
</template>
<script setup>
import { ref } from 'vue';

const name = ref('222')
const age = ref('')
function inputOn(e){
    console.log(e.target.value)
    name.value = e.target.value;
}
</script>
<style scoped>
</style>