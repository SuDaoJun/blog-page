
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
  articleFilter: {
    sortBy: 'createTime',
    tags: ''
  },
  userInfo: null,
  loginModal: false
};
const getters = {   //实时监听state值的变化(最新状态)
  getFilterObj(state) {
     return state.articleFilter
  },
  getUserInfo(state) {
     return state.userInfo
  },
  getLoginModal(state) {
     return state.loginModal
  },
}
const mutations = {
  changeFilterObj(state,obj) {
    state.articleFilter = Object.assign(state.articleFilter, obj)
  },
  changeUserInfo(state,obj) {
    state.userInfo = obj
  },
  changeLoginModal(state) {
    state.loginModal = !state.loginModal
  },
}

const actions = {
  operateFilterObj({ commit }, obj) {
    commit('changeFilterObj', obj)
  },
  operateUserInfo({ commit }, obj) {
    commit('changeUserInfo', obj)
  },
  operateLoginModal({ commit }) {
    commit('changeLoginModal')
  },
}

const store = new Vuex.Store({
   state,
   getters,
   mutations,
   actions
});

export default store;

