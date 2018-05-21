import Vue from 'vue'
import Vuex from 'vuex'
import http from '../scripts/http'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    homeList: [],
    SmsID: '',
    SmsPhone: ''
  },
  mutations: {
    setHomeList(state, items = []) {
      console.log(items)
      state.homeList = state.homeList.concat(items)
    },
    clearHomeList(state) {
      state.homeList = []
    },
    setMsgState(state, data) {
      state.SmsID = data.SmsID
      state.SmsPhone = data.SmsPhone
    }
  },
  actions: {
    async getHomeList({commit}, page = 1) {
      page == 1 && commit('clearHomeList')
      let {data} = await http.post('Product/GetList', {
        pageSize: 10,
        pageIndex: page,
        orderby: ''
      })
      commit('setHomeList', JSON.parse(data.List))
    },
    async login({commit}, dt) {
      let {data} = await http.post('User/AppLogin', dt)
      localStorage.setItem('UserKey', data.Model)
      return data
    },
    async sendMsg({commit}, dt) {
      let {data} = await http.post('SysSMS/Send', dt)
      commit('setMsgState', {SmsID: data.Model, Phone: dt.Phone})
      return data
    },
    async checkMsg({state}, dt) {
      let {data} = await http.post('SysSMS/IsValidateCodeByDeviceID', {
        SmsID: state.SmsID,
        Phone: state.Phone,
        ...dt
      })
      return data
    },
    async register() {
      let {data} = await http.post('User/AppRegister', {
        SmsID: state.SmsID,
        Phone: state.Phone,
        ...dt
      })
      return data
    },
    async bindCard({commit}, dt) {
      let {data} = await http.post('User/BindBank', dt)
      return data
    }
  }
})