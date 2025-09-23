import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import file from '@/views/file/index.vue'
import about from '@/views/about/index.vue'
import friend from '@/views/fried/index.vue'
import PostDetail from '@/views/PostDetail.vue'


const router = createRouter({
  history: createWebHashHistory(),
  
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
                    path: 'post/:id',
                    name: 'PostDetail',
                    component: PostDetail
                }
                
            ]
        },
        
    ],
    scrollBehavior(to, from, savedPosition) {
    
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    
    return { top: 0 }
  }
})

export default router
