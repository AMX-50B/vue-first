<template>
    <div>
        <h1>Sun</h1>
        <p>grandfather packet: {{ tosun }}</p>
        <p>grandfather phone: {{ phone }}</p>
        <button @click="updatePhone">updatePhone</button>
    </div>
   
</template>
<script setup lang="ts" name="Sun">
import { ref, onUnmounted ,reactive,inject} from 'vue';

let {phone,updatePhone} = inject('phoneContext',{phone:{brand:'weizhi',money:0},updatePhone:()=>{}})
defineProps([ 'tosun'])
</script>
<style scoped>
</style>