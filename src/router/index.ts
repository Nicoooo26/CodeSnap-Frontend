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
import OnlyScriptView from '@/views/OnlyScriptView.vue'
import OnlyForoView from '@/views/OnlyForoView.vue'
import AdminView from '@/views/AdminView.vue'
import ErrorView from '@/views/ErrorView.vue'
import { useCookies } from 'vue3-cookies'
import axios from 'axios'
import { ref } from 'vue'

const URL_Backend = import.meta.env.VITE_URL_BACKEND
const { cookies } = useCookies()
const role = ref<string>('')
const blocked = ref<number>(0)

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
          path: '/admin',
          name: 'admin',
          component: AdminView
        },
        {
          path: '/setting',
          name: 'setting',
          component: SettingView
        },
        {
          path: '/profile/:id?',
          name: 'profile',
          component: ProfileView
        },

        {
          path: '/scripts',
          name: 'scripts',
          component: ScriptsView
        },
        {
          path: '/script/:id',
          name: 'script',
          component: OnlyScriptView
        },
        {
          path: '/foro/:id',
          name: 'foro',
          component: OnlyForoView
        },
        {
          path: '/foros',
          name: 'foros',
          component: ForosView
        },
        {
          path: '/foros/:lenguaje',
          name: 'lenguaje',
          component: ForosInsideView
        },
        {
          path: '/instantaneas/:id',
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
    {
      path: '/blocked',
      name: 'blocked',
      component: ErrorView
    },
    // Ruta para manejar rutas no definidas
    {
      path: '/:catchAll(.*)', // Coincide con cualquier ruta no definida
      redirect: '/home' // Redirige a la página de error
    }
  ]
})

const getUsers = async (token: any):Promise<void> => {
  try {
    const response = await axios.get(`${URL_Backend}user?token=${token}`, {
      headers: { 'api-key': `${token}` }
    })
    role.value = response.data.users[0].role
    blocked.value = response.data.users[0].blocked
  } catch (e) {
    console.log(e)
  }
}

router.beforeEach(async (to, from, next) => {
  const token = cookies.get('token')
  if (token) await getUsers(token)
  if (!token && to.name != 'login') {
    // Si no hay token y no está en la página de inicio de sesión,
    // redirige a la página de inicio de sesión
    next({ name: 'login' })
  } else if (token && to.name === 'login' && blocked.value == 0) {
    // Si hay token pero está en la página de inicio de sesión,
    // redirige a la página de inicio
    next({ name: 'home' })
  } else if (to.name === 'admin' && role.value == 'USER' && blocked.value == 0) {
    next({ name: 'home' })
  } else if (token && to.name != 'blocked' && blocked.value == 1) {
    next({ name: 'blocked' })
  } else {
    // Si hay token y no está en la página de inicio de sesión,
    // o si no hay token pero está en la página de inicio de sesión,
    // permite continuar navegando
    next()
  }
})

export default router
