// import { getPermissionRoles } from '@/api/example'
import router, { asyncRoutes, constantRoutes, resetRouter } from '@/router'
// import { appCode } from '@/config'
// import { set } from '@/utils/storage'

/**
 * 判断用户权限是否涵盖当前路由权限
 * @param roles 用户角色权限
 * @param route 当前路由
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by roles-Permissions
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 *  权限状态
 *
 */
const permission = {
  // state
  state: {
    nickname: '用户007',
    roles: [], //  用户包含的权限集合
    routes: constantRoutes, // 所有路由集合
  },
  // getter
  getters: {

  },
  // mutation
  mutations: {
    setNickname: (state, name) => {
      state.nickname = name
    },
    setRoles: (state, roles) => {
      state.roles = roles
    },
    setRoutes: (state, routes) => {
      state.routes = constantRoutes.concat(routes)
    },

  },
  // action
  actions: {
    // 获取权限
    getPermissions({ commit }) {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, null)
      resetRouter()
      router.addRoutes(accessedRoutes)
      router['options'].routes = constantRoutes.concat(accessedRoutes)
      // commit('setRoles', roles)
      commit('setRoutes', accessedRoutes)
      // getPermissionRoles(appCode).then(res => {
      //   if (res.code === '0') {
      //     const { personName, userId } = res.data.me
      //     commit('setNickname', personName)
      //     set('tutorId', userId)
      //     set('setNickname', personName)
      //     const roles = res.data.permission
      //     const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      //     // console.log('accessedRoutes', accessedRoutes)
      //     resetRouter()
      //     router.addRoutes(accessedRoutes)
      //     router.options.routes = constantRoutes.concat(accessedRoutes)
      //     // console.log('router', router)
      //     commit('setRoles', roles)
      //     commit('setRoutes', accessedRoutes)
      //   }
      // })
    },
  },
}
export default permission
