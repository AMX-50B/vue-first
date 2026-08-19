<template>
    <div>
        <div>flag: {{ flag }}</div>
        <div v-if="flag">turn true</div>
        <div v-else="!flag">turn false</div>
        <button @click="flag=!flag">click to turn</button>
        <!-- v-show 本质是 display:none -->
        <div v-show="flag">show</div>
    </div>
   
</template>
<script setup>
import { ref } from 'vue';

const flag = ref(false)
</script>
<style scoped>
</style>