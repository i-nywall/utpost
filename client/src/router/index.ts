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
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/profil',
      name: 'Profile',
      redirect: { name: 'Guides' },
    },
  ],
})

export default router
