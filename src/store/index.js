import Vue from 'vue'
import Vuex from 'vuex'
import http from '../scripts/http'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    homeList: []
  },
  mutations: {
    setHomeList(state, items = []) {
      state.homeList = state.homeList.concat(items)
    }
  },
  actions: {
    async getHomeList({commit}) {
      let {data} = await http('home.json')
      commit('setHomeList', data)
    },
    async login({commit}, dt) {
      let {data} = await http.post('User/AppLogin', dt)
      localStorage.setItem('UserKey', data.Model)
      return data
    }
  }
})