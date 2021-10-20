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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router