import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import file from '@/views/file/index.vue'
import about from '@/views/about/index.vue'
import friend from '@/views/fried/index.vue'
import post from '@/views/bost/index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  
    routes:[
        {
            path:'/',
            component:Layout,
            children:[
                {
                    path:'',
                    component:Home
                },
                {
                    path:'file',
                    component:file
                },
                {
                    path:'about',
                    component:about
                },
                {
                    path:'friend',
                    component:friend
                },
                {
                    path:'post/:slug',
                    component:post
                },
                
            ]
        },
        
    ],
})

export default router
