<template>
    <div>
        <div>name: {{ mm.name }}</div>
        <div>age: {{ mm.age }}</div>
        <div>is adult: {{ mm.age>=18 ? 'Yes' : 'No' }}</div>
        <div>is adult with computed: {{ computedValue }}</div>
    </div>
   
</template>
<script setup>
import { ref,reactive,computed } from 'vue';

const mm = reactive({
    name:'yy',
    age:18

})
const computedValue = computed(()=>{
    return mm.age>=18 ? 'Yes' : 'No'
})
</script>
<style scoped>
</style>