import { createRouter, createWebHistory } from 'vue-router'
import ErrorPage from '@/views/ErrorPage.vue'
import LogginRegisterComponent from '@/views/LogginRegisterComponent.vue'
import homePage from '@/views/homePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/error',
      name: 'error',
      component: ErrorPage
    },
    {
      path: '/',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LogginRegisterComponent
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: homePage
    }
  ]
})

export default router
