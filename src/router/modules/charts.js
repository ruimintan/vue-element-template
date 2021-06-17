/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  alwaysShow: true,
  name: 'Charts',
  meta: {
    title: 'Charts',
    icon: 'chart'
  },
  children: [
    {
      path: 'base-charts',
      component: () => import('@/views/charts/base-charts'),
      name: 'BaseCharts',
      meta: { title: 'Base Charts' }
    },
  ]
}

export default chartsRouter
