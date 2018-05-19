import Vue from 'vue'
import Vuex from 'vuex'
import http from '../scripts/http'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    homeList: [],
    SmsID: ''
  },
  mutations: {
    setHomeList(state, items = []) {
      state.homeList = state.homeList.concat(items)
    },
    setMsgState(state, data) {
      state.SmsID = data.Model
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
    },
    async sendMsg({commit}, dt) {
      let {data} = await http.post('SysSMS/Send', dt)
      commit('setMsgState', data)
      return data
    },
    async checkMsg() {
      let {data} = await http.post('SysSMS/Check', dt)
      return data
    },
    async register() {},
    async bindCard({commit}, dt) {
      let {data} = await http.post('User/BindBank', dt)
      return data
    }
  }
})