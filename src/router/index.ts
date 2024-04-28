import { createRouter, createWebHistory } from 'vue-router'
import LogginRegisterComponent from '@/views/LogginRegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import SettingView from '@/views/SettingView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import PrivacityPoliticView from '@/views/PrivacityPoliticView.vue'
import ScriptsView from '@/views/ScriptsView.vue'
import ExplorerView from '@/views/ExplorerView.vue'
import ForosView from '@/views/ForosView.vue'
import InstantaneasView from '@/views/InstantaneasView.vue'
import SupportView from '@/views/SupportView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
        },
        {
          path: '/scripts',
          name: 'scripts',
          component: ScriptsView
        },
        {
          path: '/foros',
          name: 'foros',
          component: ForosView
        },
        {
          path: '/instantaneas',
          name: 'instantaneas',
          component: InstantaneasView
        },
        {
          path: '/explorar',
          name: 'explorar',
          component: ExplorerView
        },
        {
          path: '/soporte',
          name: 'soporte',
          component: SupportView
        }
      ]
    },
    {
      path: '/',
      name: 'login',
      component: LogginRegisterComponent
    },
    {
      path: '/politicyPrivacity',
      name: 'politicy',
      component: PrivacityPoliticView
    },
    // Ruta para manejar rutas no definidas
    {
      path: '/:catchAll(.*)', // Coincide con cualquier ruta no definida
      redirect: '/home' // Redirige a la página de error
    }
  ]
})


export default router
