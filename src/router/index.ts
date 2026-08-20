import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue';
import ClassManage from '@/views/ClassManage.vue';
import Show from '@/views/Show.vue';
// 创建路由器
const router = createRouter({
    // 路由模式: 使用 hash 模式: url 中会出现 # 号, 例如: http://localhost:8080/#/home 
    // history模式: url 中不会出现 # 号, 例如: http://localhost:8080/home 后期需要再nginx配置路由转发
    history: createWebHashHistory(),
    routes: [
        {
            name: 'home',
            // path: '/home/:id?', // 动态路由参数, 例如: /home/123
            path: '/home', // 静态路由参数, 例如: /home?id=1
            component: Home,
            // 嵌套路由
            // children: [
            //     {
            //         name: 'classManage',
            //         path: 'classManage',
            //         component: ClassManage
            //     }
            // ],

            // props: true default: false, // 传递路由参数给组件, 例如: /home/123, 组件中可以通过 this.$route.params.id 获取到 123
            // props: { id: 1 }, // 传递静态参数给组件, 组件中可以通过 this.$route.params.id 获取到 1
            // props: (route) => ({ id: route.query.id }), // 传递动态参数给组件, 组件中可以通过 this.$route.params.id 获取到 1
        },
        {
            name: 'manage',
            path: '/manage', 
            component:ClassManage
        },
        {
            name: 'show',
            path: '/show',
            component: Show
        },
        {
            path:'/',
            redirect:'/home'
        }
    ]
})

export default router