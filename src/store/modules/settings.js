import defaultSettings from '@/settings'

const { title, fixedHeader, sidebarLogo, showSettings } = defaultSettings

const state = {
  title, // 平台名称
  showSettings, // 是否显示rightPanel按钮
  fixedHeader, //
  sidebarLogo, // 是否展示logo
  tableHeight: 600, // 表格宽度
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  setTableHeight: (state, height) => {
    state.tableHeight = height
  },
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

