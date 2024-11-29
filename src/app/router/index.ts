import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import AppLayout from '@/app/layouts/AppLayout.vue'
import AuthLayout from '@/app/layouts/AuthLayout.vue'
import store from '../store'

Vue.use(VueRouter)

export enum ROUTE_NAMES {
  DEFAULT_ROUTE = 'requests-list',
  LOGIN = 'login',
  REQUESTS_LIST = 'requests-list'
}

const routes: Array<RouteConfig> = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: ROUTE_NAMES.LOGIN,
        component: () => import('@/pages/LoginPage.vue'),
        meta: {
          title: 'Вход в систему'
        }
      }
    ]
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        redirect: { name: ROUTE_NAMES.REQUESTS_LIST }
      },
      {
        path: 'requests-list',
        name: ROUTE_NAMES.REQUESTS_LIST,
        component: () => import('@/pages/HomePage.vue'),
        meta: {
          title: 'Список заявок'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: { name: ROUTE_NAMES.REQUESTS_LIST }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!store.getters['auth/user']?.key

  if (to.path.startsWith('/auth') && isAuthenticated) {
    next({ name: ROUTE_NAMES.DEFAULT_ROUTE })
    return
  }

  if (!to.path.startsWith('/auth') && !isAuthenticated) {
    next('/auth')
    return
  }

  next()
})

export default router
