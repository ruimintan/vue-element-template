import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

import dashboard from './modules/dashboard'
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRoutes = [{
  path: '/noFound',
  name: 'NoFound',
  component: () => import('@/views/noFound'),
  hidden: true
}]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/demo',
    children: [{
      path: 'demo',
      name: 'demo',
      meta: {
        title: 'demo',
        icon: 'dashboard',
      },
      component: () => import('@/views/demo'),
    }]
  },
  ...dashboard,
  componentsRouter,
  chartsRouter,
  {
    path: '*',
    redirect: '/noFound',
    hidden: true
  }
]

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
