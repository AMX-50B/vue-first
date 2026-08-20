<template>
    <div>
        <h1>Father</h1>
        <p>Father packet: {{ packet }}</p>
        <p>My child packet: {{ childPacket }}</p>
        <p>My boy packet: {{ boyPacket }}</p>
        <p>custom packet: {{ customPacket }}</p>
        <p>custom toy: {{ customToy }}</p>
        <!-- <input v-model="packet" type="text" placeholder="请输入父组件数据"/> -->
        <!-- v-model指令是语法糖，等价于下面的写法:一个赋值+一个事件监听 -->
        <!-- <input :value="packet" @input="packet = ($event.target as HTMLInputElement).value"/> -->
         <!-- 下面是自定义组件的v-model写法 -->
         <!-- <CumstomInput :modelValue="customPacket" @update:modelValue="customPacket = $event"/> -->
         <!-- 只要子组件实现，就直接用v-model指令了 另：v-model 可以指定键名 -->
         <CustomInput v-model:packet="customPacket" v-model:toy="customToy" />
    </div>
    <div>
        <Child :pc="packet" :childPacket="getChildPacket" @custom-event="getChildPacket" />
        <Boy/>
    </div>
   
</template>
<script setup lang="ts" name="Father">
import { onUnmounted, ref } from 'vue';
import Child from './Child.vue'
import Boy from './Boy.vue'
import CustomInput from './CustomInput.vue';
import emitter from '@/utils/emitter';

let packet = ref('Money');
let childPacket = ref('');
let boyPacket = ref('');
let customPacket = ref('');
let customToy = ref('');

function getChildPacket(packet:string){
    childPacket.value = packet;
}

// 接收方：绑定事件
function getBoyPacket(v: string){
    boyPacket.value = v;
}

emitter.on('boy-show-packet', getBoyPacket)
// 组件卸载时，解绑事件:避免占内存
onUnmounted(()=>{emitter.off('boy-show-packet', getBoyPacket);})

</script>
<style scoped>
</style>
