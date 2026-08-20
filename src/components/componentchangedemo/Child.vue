<template>
    <div>
        <h1>Child</h1>
        <p>packet: {{ packet }}</p>
        <p>Father packet: {{ pc }}</p>
        <p>Boy packet: {{ boyPacket }}</p>
        <button @click="childPacket(packet)">function send</button>
        <button @click="emit('custom-event', packet)">emit custom event</button>
    </div>
   
</template>
<script setup lang="ts" name="Child">
import { ref, onUnmounted } from 'vue';
import emitter from '@/utils/emitter';

let packet = ref('toy');
let boyPacket = ref('');

function getBoyPacket(packet:string){
    boyPacket.value = packet;
}

// 接收方：绑定事件
emitter.on('boy-show-packet', getBoyPacket);
// 组件卸载时，解绑事件:避免占内存
onUnmounted(()=>{
    emitter.off('boy-show-packet', getBoyPacket);
})

defineProps([ 'pc','childPacket'])
const emit = defineEmits(['custom-event'])
</script>
<style scoped>
</style>