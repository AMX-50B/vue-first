<template>
    <!-- ref 声明响应式 -->
    <div >count:{{ count }}</div>
    <button v-on:click="add">click</button>
        <!-- reactive 声明响应式 -->
    <div>
        <div>

        </div>
        reactive demo:name:{{ mm.name }},age:{{ mm.age }}
    </div>
    <input type="text" v-model="mm.name"/>
    <input type="number" v-model="mm.age"/>
</template>
<script setup>
import { ref,reactive } from 'vue';

const count = ref(0);
const mm = reactive({
    name:'yy',
    age:18

})
function add(){
    count.value++
    console.log(count.value);
    
}
</script>
<style scoped>
</style>