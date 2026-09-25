import { createRouter, createWebHistory } from 'vue-router'
import GuideView from '@/views/GuideView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Guides',
      component: GuideView,
    },
    {
      path: '/guides/:slug',
      name: 'GuideDetail',
      component: () => import('@/views/GuideDetail.vue'),
    },
  ],
})

export default router
