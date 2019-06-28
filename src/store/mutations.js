import * as types from './mutation-types'

const mutations = {
  // 顶部标签
  [types.SET_TAB_LIST] (state, list) {
    state.tabList = list
  },
  // 当前标签
  [types.SET_CURRENT_TAB] (state, tab) {
    state.currentTab = tab
  }
}

export default mutations
