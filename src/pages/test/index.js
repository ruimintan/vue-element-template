import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
// import router from './router'
// import store from './store'
import Utils from '@/utils/index.js'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import '@/icons' // icon
import '@/permission' // permission control 全局路由守卫

import '@/directive' // 全局directive
import '@/filter' // 全局filter


import RmCharts from '@/components/apps/base/echarts'

import { isPermission } from '@/directive/permission'
Vue.prototype.$isPermission = isPermission // 全局权限方法

import * as Echarts from 'echarts'
Vue.prototype.$echarts = Echarts // 全局echarts

Vue.use(ElementUI)

Vue.config.productionTip = false

// 全局引入
Vue.component('rm-charts', RmCharts)

// 全局注册
Object.defineProperty(Vue.prototype, '$utils', {
  value: Utils,
})

new Vue({
  render: h => h(App)
}).$mount('#app')