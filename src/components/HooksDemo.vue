<template>
    <div>
        <div>
            <p>count: {{ count }}</p>
            <button @click="add">add</button>
        </div>
        <div>
            <img  v-for="(v,i) in dogList" :key="i" :src="v"/>
        </div>
        <div>
            <button @click="getDog">getDog</button>
        </div>
    </div>
   
</template>
<script setup lang="ts">
import { ref } from 'vue';
import useCount from '@/hooks/useCount';
import useGetDog from '@/hooks/useGetDog';

const {count,add} = useCount()
const {dogList,getDog} = useGetDog()

</script>
<style scoped>
 img{
    height: 100px;
    padding-left: 10px;
 }
</style>