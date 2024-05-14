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
import ForosInsideView from '@/views/ForosInsideView.vue'
import { useCookies } from 'vue3-cookies';
import OnlyScriptView from '@/views/OnlyScriptView.vue';
const {cookies} = useCookies()



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
          path: '/onlyScript',
          name: 'onlyScript',
          component: OnlyScriptView
        },
        {
          path: '/foros',
          name: 'foros',
          component: ForosView,
        },
        {
          path: '/foros/:lenguaje',
          name: 'lenguaje',
          component: ForosInsideView,
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

let isFirstLoad = true;

router.beforeEach((to, from, next) => {
  const token = cookies.get('token');

  if (!token && to.name !== 'login') {
    // Si no hay token y no está en la página de inicio de sesión,
    // redirige a la página de inicio de sesión
    next({ name: 'login' });
  } else if (token && to.name === 'login') {
    // Si hay token pero está en la página de inicio de sesión,
    // redirige a la página de inicio
    next({ name: 'home' });
  } else {
    // Si hay token y no está en la página de inicio de sesión,
    // o si no hay token pero está en la página de inicio de sesión,
    // permite continuar navegando
    next();
  }
});


export default router
