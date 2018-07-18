import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import Auth from '../api/auth'
import Login from '@/template/login'
import Maps from '@/template/amap'
import Home from '@/template/home'
import Charts from '@/template/charts'
import Empty from '@/template/404'
import Permission from '@/template/permission'
import Table from '@/template/table'

Vue.use(Router)

let staticRouter = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '/table',
      name: 'table',
      component: Table
    }, {
      path: '/amap',
      name: 'amap',
      component: Maps
    }, {
      path: '/charts',
      name: 'charts',
      component: Charts
    }, {
      path: '/404',
      name: '404',
      component: Empty
    }, {
      path: '/permission',
      name: 'permission',
      component: Permission,
      meta: {
        roles: 'admin'
      }
    }],
    redirect: '/table'
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new Router({
  mode: 'history',
  routes: staticRouter
})

router.beforeEach((to, from, next) => {
  if (Auth.isLogin()) {
    if (to.path === '/login') {
      Cookies.remove('roles')
      Auth.removeToken()
      Auth.removeLoginStatus()
      next()
    } else {
      if (Cookies.get('roles')) {
        let arr = staticRouter[2].children
        let router = []
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].meta) {
            if (arr[i].meta.roles === Cookies.get('roles')) {
              router.push(arr[i])
            }
          } else {
            router.push(arr[i])
          }
        }
        localStorage.setItem('router', JSON.stringify(router))
        next()
      } else {
        next({path: '/login'})
      }
    }
  } else {
    next()
  }
})

export default router
