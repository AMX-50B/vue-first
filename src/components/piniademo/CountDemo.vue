<template>
    <h1>CountDemo:{{ countStore.sum }}</h1>
    <select v-model.number="value">
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
    </select>
    <button @click="add">+</button>
    <button @click="subtract">-</button>
</template>
<script setup>
import { ref } from 'vue';
import { useCountStore } from '@/store/Count'
const value = ref(0);
const countStore = useCountStore();
let sum = countStore.sum;

function add() {
    countStore.sum += value.value;
}

function subtract() {
    countStore.sum -= value.value;
}


</script>
<style scoped>
</style>