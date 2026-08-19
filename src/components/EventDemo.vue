<template>
    <div>
        <div>name: {{ mm.name }}</div>
        <div>age: {{ mm.age }}</div>
        <!-- 内联事件 -->
        <button @click="mm.age++">click inline</button><br/>
        <!-- 外联事件 -->
        <button @click="out">click online</button><br/>
        <!-- 事件对象 -->
        <button @click="itemEvent">button event</button><br/>
        <!-- 事件数据 -->
        <button @click="itemData(mm)">button data</button><br/>
        <!-- 事件对象+数据 -->
         <button @click="itemDataAndEvent(mm,$event)">button data and event</button><br/>
        <!-- 事件修饰符 如：once -->
         <button @click.once="itemOnce(mm)">button once</button><br/>
         <input @keyup.enter="iputEnter"/>
    </div>
   
</template>
<script setup>
import { reactive } from 'vue';
// 外联事件
function out(){
    mm.name = 'out'
}
// 事件对象
function itemEvent(event){
    console.log(event);
    console.log(event.target)
    event.target.innerHTML = 'up event'
}
function itemData(data){
    console.log(data)
}
function itemDataAndEvent(data,event){
    console.log(event)
    console.log(data.age)
    event.target.innerHTML=data.name
}
function itemOnce(){
    console.log('click once');
}
function iputEnter(){
    console.log('input enter')
}
const mm = reactive({
    name:'yy',
    age:18

})
</script>
<style scoped>
</style>