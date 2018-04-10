import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('~/views/Login'),
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    component: () => import('~/components/Home'),
    children: [
      {
        path: '',
        component: () => import('~/views/OverView'),
      },
      {
        path: '/clients',
        component: () => import('~/views/DataView'),
      },
      {
        path: '/sessions',
        component: () => import('~/views/DataView'),
      },
      {
        path: '/topics',
        component: () => import('~/views/DataView'),
      },
      {
        path: '/subscriptions',
        component: () => import('~/views/DataView'),
      },
      {
        path: '/plugins',
        component: () => import('~/views/Plugins'),
      },
      {
        path: '/plugins/:nodeName/:pluginName',
        component: () => import('~/views/PluginConfig'),
      },
      {
        path: '/listeners',
        component: () => import('~/views/Listeners'),
      },
      {
        path: '/services',
        component: () => import('~/views/services/Services'),
      },
      {
        path: '/services/:serviceName',
        component: () => import('~/views/services/ServiceDetails'),
      },
      {
        path: '/websocket',
        component: () => import('~/views/WebSocket'),
      },
      {
        path: '/http_api',
        component: () => import('~/views/HttpApi'),
      },
      {
        path: '/applications',
        component: () => import('~/views/Applications'),
      },
      {
        path: '/users',
        component: () => import('~/views/Users'),
      },
      {
        path: '/settings',
        component: () => import('~/views/Settings'),
      },
    ],
  },
  {
    path: '/test',
    component: () => import('~/views/Test'),
  },
  {
    path: '*',
    meta: { requiresAuth: false },
    component: () => import('~/views/NotFound'),
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  const { requiresAuth = true } = to.meta
  if (requiresAuth) {
    if (!store.state.user.password) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    } else {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      next()
    }
  } else {
    next()
  }
})

export default router
