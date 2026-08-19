<template>
    <div>
        <ul>
            <li v-for="value in stus" :key="value.id">
                <span>name:{{ value.name}}</span><br/>
                <span>age:{{ value.age}}</span><br/>
                <span>subjects:{{ value.subjects.join(',')}}</span><br/>
                <span>isSch:{{ value.inSch}}</span><br/>
             </li>
        </ul>
        
    </div>
   
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { type Student,Students } from '@/types/Student';

let stu:Student = {
    id: '1',
    name: 'Liu anxin',
    age: 2,
    subjects: ['math','histroy'],
    inSch: false
}
const stus = ref<Students>(
    Array.from({ length: 10 }, (_, index) => ({
        ...stu,
        id: String(index + 1)
    }))
)
</script>
<style scoped>
</style>