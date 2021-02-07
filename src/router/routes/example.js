/* eslint-disable */
import Layout from '@/layout'
export default [
    {
    path: '/',
    component: Layout,
    redirect: '/example',
    meta: {
      title: '菜单',
      icon: 'targetAnalysis',
    },
    children: [{
      path: 'example',
      name: 'example',
      meta: {
        title: '菜单',
        icon: 'targetAnalysis',
      },
      component: () => import('@/views/example'),
    }]
  },
]
