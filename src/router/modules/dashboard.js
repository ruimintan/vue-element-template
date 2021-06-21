/* eslint-disable */
import Layout from '@/layout'
export default [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      meta: {
        title: 'Dashboard',
        icon: 'dashboard',
      },
      component: () => import('@/views/dashboard'),
    }]
  },
]
