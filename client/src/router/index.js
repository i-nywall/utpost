import { createRouter, createWebHistory } from 'vue-router'
import Guides from '@/views/Guides.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Guides',
      component: Guides,
    },
    {
      path: '/guides/:slug',
      name: 'GuideDetail',
      component: () => import('@/views/GuideDetail.vue'),
    },
  ],
})

export default router
