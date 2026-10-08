import { createRouter, createWebHistory } from 'vue-router'
import GuidesView from '@/views/GuidesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Guides',
      component: GuidesView,
    },
    {
      path: '/guides/:slug',
      name: 'GuideDetail',
      props: true,
      component: () => import('@/views/GuideDetail.vue'),
    },
    {
      path: '/turer',
      name: 'Tours',
      component: () => import('@/views/ToursView.vue'),
    },
    {
      path: '/turer/:id',
      name: 'TourDetail',
      redirect: '/',
    },
  ],
})

export default router
