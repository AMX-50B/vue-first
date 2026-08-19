import {createRouter,createWebHashHistory} from 'vue-router'
import Home from '@/views/Home.vue';
import ClassManage from '@/views/ClassManage.vue';
import Show from '@/views/Show.vue';
// 创建路由器
const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {path:'/home',component:Home},
        {path:'/manage',component:ClassManage},
        {path:'/show',component:Show},
    ]
})

export default router