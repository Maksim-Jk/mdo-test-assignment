import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import AppLayout from '@/app/layouts/AppLayout.vue'
import AuthLayout from '@/app/layouts/AuthLayout.vue'
import store from '../store'

Vue.use(VueRouter)

export enum ROUTE_NAMES {
  DEFAULT_ROUTE = 'appeals-list',
  LOGIN = 'login',
  REQUESTS_LIST = 'appeals-list'
}

const authRoutes: Array<RouteConfig> = [
  {
    path: '',
    redirect: { name: ROUTE_NAMES.LOGIN }
  },
  {
    path: 'login',
    name: ROUTE_NAMES.LOGIN,
    component: () => import('@/pages/LoginPage.vue'),
    meta: { title: 'Вход в систему' }
  }
]

const appRoutes: Array<RouteConfig> = [
  {
    path: '',
    redirect: { name: ROUTE_NAMES.REQUESTS_LIST }
  },
  {
    path: 'appeals-list',
    name: ROUTE_NAMES.REQUESTS_LIST,
    component: () => import('@/pages/HomePage.vue'),
    meta: { title: 'Список заявок' }
  }
]

const routes: Array<RouteConfig> = [
  {
    path: '/auth',
    component: AuthLayout,
    children: authRoutes
  },
  {
    path: '/',
    component: AppLayout,
    children: appRoutes
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
    next({ name: ROUTE_NAMES.LOGIN })
    return
  }

  next()
})

export default router
