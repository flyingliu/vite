import { createRouter, createWebHashHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/index/index.vue')
  },
  {
    path: '/art',
    name: 'art',
    component: () => import('../views/article/index.vue')
  },
  {
    path: '/classic',
    name: 'classic',
    component: () => import('../views/classic/index.vue')
  },  
  {
    path: '/jizhiwengao',
    name: 'jizhiwengao',
    component: () => import('../views/jizhiwengao/index.vue')
  },
  {
    path: '/good',
    name: 'good',
    component: () => import('../views/good/index.vue')
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('../views/demo/index.vue')
  },
  {
    path: '/web',
    name: 'web',
    component: () => import('../views/web/index.vue')
  },
  {
    path: '/pano',
    name: 'pano',
    component: () => import('../views/pano/index.vue')
  },
  {
    path: '/imglist',
    name: 'imglist',
    component: () => import('../views/imglist/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router