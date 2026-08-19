import {createRouter,createWebHashHistory} from 'vue-router'
import Home from '@/views/Home.vue';
import ClassManage from '@/views/ClassManage.vue';
import Show from '@/views/Show.vue';
// 创建路由器
const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {name:'home',path:'/home',component:Home},
        {name:'manage',path:'/manage',component:ClassManage},
        {name:'show',path:'/show',component:Show},
    ]
})

export default router