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

  if (isFirstLoad) {
    // Si es la primera carga del proyecto
    if (token) {
      // Si hay token, redirige a la página de inicio
      next({ name: 'home' });
    } else {
      // Si no hay token, redirige a la página de inicio de sesión
      next({ name: 'login' });
    }
    isFirstLoad = false; // Marca que ya no es la primera carga
  } else {
    // Si no es la primera carga del proyecto, continúa navegando
    next();
  }
});


export default router
