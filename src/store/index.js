import Vue from 'vue'
import Vuex from 'vuex'
import http from '../scripts/http'
import {dateFormat} from 'vux'
Vue.use(Vuex)
const PAGE_SIZE = 10
export default new Vuex.Store({
  state: {
    homeList: [],
    SmsID: '',
    SmsPhone: '',
    SmsVCode: '',
    productDetail: {},
    UserKey: localStorage.getItem('UserKey'),
    ProductPic: [],
    orderDetail: {},
    UserInfo: {}
  },
  getters: {
    payEndTime: state => {
      if (state.orderDetail.CreateTime) {
        return dateFormat(new Date(parseInt(state.orderDetail.CreateTime.match((/\d{13}/))) + 60*30*1000), 'YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  mutations: {
    setHomeList(state, items = []) {
      state.homeList = state.homeList.concat(items)
    },
    clearHomeList(state) {
      state.homeList = []
    },
    setSmsState(state, data) {
      state.SmsID = data.SmsID
      state.SmsPhone = data.Phone
    },
    setSmsCode(state, data) {
      state.SmsVCode = data.ValidateCode
    },
    clearSmsState(state) {
      state.SmsID = ''
      state.SmsPhone = ''
      state.SmsVCode = ''
    },
    setProduct(state, data) {
      state.productDetail = data
    },
    clearUserKey(state) {
      localStorage.removeItem('UserKey')
      state.UserKey = ''
    },
    setUserKey(state, key) {
      localStorage.setItem('UserKey', key)
      state.UserKey = key
    },
    setProductPic(state, data) {
      state.ProductPic = data
    },
    setOrder(state, data) {
      state.orderDetail = data
    },
    setUserInfo(state, data) {
      state.UserInfo = data
    }
  },
  actions: {
    async getUserInfo({commit}, id) {
      let {data} = await http.post('User/GetModel')
      data.Code == 1 && commit('setUserInfo', data.UserInfo)
    },
    async wxPay({commit}, dt) {
      let {data} = await http.post('Pay/WxPay', dt)
      return data
    },
    async Alipay({commit}, dt) {
      let {data} = await http.post('Pay/AliPay', dt)
      return data
    },
    async getOrder({commit}, id) {
      let {data} = await http.post('ProductOrderIn/GetModel', {
        id: id
      })
      data.Code == 1 && commit('setOrder', data.Model)
    },
    async getProductPic({commit}, dt) {
      let {data} = await http.post('ProductAttachment/Get_Attachment', dt)
      data.Code == 1 && commit('setProductPic', JSON.parse(data.qyzz))
    },
    async getProduct({commit}, dt) {
      let {data} = await http.post('Product/GetModel', dt)
      data.Code == 1 && commit('setProduct', data.Model)
    },
    async getHomeList({commit}, page = 1) {
      let {data} = await http.post('Product/GetList', {
        pageSize: PAGE_SIZE,
        pageIndex: page,
        orderby: ''
      })
      page == 1 && commit('clearHomeList')
      data.Code == 1 && commit('setHomeList', JSON.parse(data.List))
      return data.Count
    },
    async login({commit}, dt) {
      let {data} = await http.post('User/AppLogin', dt)
      data.Code == 1 && commit('setUserKey', data.Model)
      return data
    },
    async sendMsg({commit}, dt) {
      let {data} = await http.post('SysSMS/Send', dt)
      data.Code == 1 && commit('setSmsState', {SmsID: data.Model, Phone: dt.Phone})
      return data
    },
    async checkMsg({state, commit}, dt) {
      let {data} = await http.post('SysSMS/IsValidateCodeByDeviceID', {
        SmsID: state.SmsID,
        Phone: state.SmsPhone,
        ...dt
      })
      data.Code == 1 && commit('setSmsCode', dt)
      return data
    },
    async register({state, commit}, dt) {
      let {data} = await http.post('User/AppRegister', {
        SmsID: state.SmsID,
        Phone: state.SmsPhone,
        ValidateCode: state.SmsVCode,
        ...dt
      })
      if (data.Code == 1) {
        commit('setUserKey', data.Model)
        commit('clearSmsState')
      }
      return data
    },
    async bindCard({commit}, dt) {
      let {data} = await http.post('User/BindBank', dt)
      return data
    },
    async buyProduct({commit}, dt) {
      let {data} = await http.post('ProductOrderIn/Addinfo', dt)
      return data
    }
  }
})