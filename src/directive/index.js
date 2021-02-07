import Vue from 'vue'
import permission from './permission'
import waves from './waves'

// 权限指令
Vue.directive('permission', permission)
// 按钮点击波纹效果
Vue.directive('waves', waves)
