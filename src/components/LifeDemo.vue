<template>
    <div>
       <p>count : {{ count }}</p>
       <button @click="count++">count++</button>
    </div>  
</template>
<script setup>
import { ref,onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted } from 'vue';

let count = ref(0)
console.log("chrid created");

onBeforeMount(()=>{
    console.log("before mount");
})
onMounted(()=>{
    console.log("mounted");
})
onBeforeUpdate(()=>{
    console.log("before update")
})
onUpdated(()=>{
    console.log("updated")
})
onBeforeUnmount(()=>{
    console.log("before unmount")
})
onUnmounted(()=>{
    console.log("unmounted")
})


</script>
<style scoped>
</style>