import { createRouter, createWebHistory } from 'vue-router'
import ErrorPage from '@/views/ErrorView.vue'
import LogginRegisterComponent from '@/views/LogginRegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import SettingView from '@/views/SettingView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/error',
      name: 'error',
      component: ErrorPage
    },
    {
      path: '/layout',
      name: 'Public',
      component: DefaultLayout,
      redirect: '/',
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomeView
        },
        {
          path: '/setting',
          name: 'setting',
          component: SettingView
        },
        {
          path: '/profile',
          name: 'profile',
          component: ProfileView
        }
      ]
    },
    {
      path: '/',
      name: 'login',
      component: LogginRegisterComponent
    }
  ]
})

export default router
