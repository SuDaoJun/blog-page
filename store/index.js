import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
  articleFilter: {
    sortBy: 'createTime',
    tags: ''
  },
  userInfo: null,
  loginModal: false
};
// 创建一个对象存储一系列
const mutations = {
    taglistfirst (state,taglistfirst) {
        state.taglistfirst=taglistfirst
    },
    changeFilterObj(state,obj) {
      state.articleFilter = Object.assign(state.articleFilter, obj)
    },
    changeUserInfo(state,obj) {
      state.userInfo = obj
    },
    changeLoginModal(state) {
      state.loginModal = !state.loginModal
    }
};


const store = () => new Vuex.Store({
  state,
  mutations
})

export default store;
