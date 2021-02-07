/*
 * @Author: ruimin.tan@zhangmen.com
 * @Date: 2020-12-16 10:34:25
 * @LastEditTime: 2021-01-20 11:03:58
 * @Description: 
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    permission,
  },
  getters,
})

export default store
