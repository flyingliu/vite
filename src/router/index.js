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
    path: '/good',
    name: 'good',
    component: () => import('../views/good/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router