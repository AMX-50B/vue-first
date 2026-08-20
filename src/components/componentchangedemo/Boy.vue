<template>
    <div>
        <h1>Boy</h1>
        <p>packet: {{ packet }}</p>
        <button @click="emitter.emit('boy-show-packet', packet)">mitt send</button>
    </div>
</template>
<script setup lang="ts" name="Boy">
import { ref } from 'vue';
import emitter from '@/utils/emitter';

let packet = ref('toy');

defineExpose({packet})
</script>
<style scoped>
</style>