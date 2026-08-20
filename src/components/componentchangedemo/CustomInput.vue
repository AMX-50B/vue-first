<template>
    <div>
        <input :value="packet" @input="emit('update:packet', ($event.target as HTMLInputElement).value)" placeholder="packet"/>
        <input :value="toy" @input="emit('update:toy', ($event.target as HTMLInputElement).value)" placeholder="toy"/>
    </div>
</template>
<script setup lang="ts" name="Boy">
import { ref } from 'vue';
// 这就是底层组件的实现方式
// 子组件
defineProps([ 'packet','toy'])
const emit = defineEmits(['update:packet', 'update:toy'])
</script>
<style scoped>
</style>