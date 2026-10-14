import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/guider',
      name: 'Guides',
      component: () => import('@/views/GuidesView.vue'),
    },
    {
      path: '/guides/:slug',
      name: 'GuideDetail',
      props: true,
      component: () => import('@/views/GuideDetailView.vue'),
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
