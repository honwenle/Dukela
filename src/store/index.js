import Vue from 'vue'
import Vuex from 'vuex'
import http from '../scripts/http'
Vue.use(Vuex)
const PAGE_SIZE = 10
// FIXME: 数据清理
export default new Vuex.Store({
  state: {
    homeList: [],
    villaList: [],
    SmsID: '',
    SmsPhone: '',
    SmsVCode: '',
    ProductDetail: {},
    UserKey: localStorage.getItem('UserKey'),
    ProductPic: [],
    OrderDetail: {},
    UserInfo: {},
    VillaPic: [],
    VillaDetail: {},
    RoomList: [],
    RoomDetail: {},
    RoomPic: [],
    UserProduct: [],
    UserOrderList: [],
    UserMessage: [],
    ProductStream: [],
    deduct: {},
    goodsCount: 0,
    TRate: 1,
    wxInfo: {}
  },
  getters: {
    getRecordDetail: (state) => (id) => {
      return state.ProductStream.find(item => item.ID == id)
    },
    getOrderDetail: (state) => (id) => {
      return state.UserOrderList.find(item => parseInt(item.ID) == id)
    }
  },
  mutations: {
    setWxInfo(state, data) {
      state.wxInfo = data
    },
    setTRate(state, tr) {
      state.TRate = tr
    },
    setDeduct(state, data) {
      state.deduct = data
    },
    clearDeduct(state) {
      state.deduct = {}
    },
    setUserMessage(state, items = []) {
      state.UserMessage = state.UserMessage.concat(items)
    },
    clearUserMessage(state) {
      state.UserMessage = []
    },
    setUserOrderList(state, items = []) {
      state.UserOrderList = state.UserOrderList.concat(items)
    },
    clearUserOrderList(state) {
      state.UserOrderList = []
    },
    setVillaList(state, items = []) {
      state.villaList = state.villaList.concat(items)
    },
    clearVillaList(state) {
      state.villaList = []
    },
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
      state.ProductDetail = data
    },
    setVilla(state, data) {
      state.VillaDetail = data
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
    setVillaPic(state, data) {
      state.VillaPic = data
    },
    setRoomList(state, data) {
      state.RoomList = data
    },
    setRoom(state, data) {
      state.RoomDetail = data
    },
    setRoomPic(state, data) {
      state.RoomPic = data
    },
    setOrder(state, data) {
      state.OrderDetail = data
    },
    setUserInfo(state, data) {
      state.UserInfo = data
    },
    setUserProduct(state, {items = [], count}) {
      state.UserProduct = state.UserProduct.concat(items)
      state.goodsCount = count
    },
    clearUserProduct(state) {
      state.UserProduct = []
      state.goodsCount = 0
    },
    setProductStream(state, items = []) {
      state.ProductStream = state.ProductStream.concat(items)
    },
    clearProductStream(state) {
      state.ProductStream = []
    }
  },
  actions: {
    async getTRate({commit}) {
      let {data} = await http.post('SysConfig/GetModel', {
        ID: 1
      })
      data.Code == 1 && commit('setTRate', data.Info.TProportion)
    },
    async getUserMessage({commit}, {page = 1}) {
      let {data} = await http.post('UserMessage/GetList', {
        pageSize: PAGE_SIZE,
        pageIndex: page,
        orderby: ''
      })
      page == 1 && commit('clearUserMessage')
      data.Code == 1 && commit('setUserMessage', data.List)
      return data.Count || 0
    },
    async getUserOrderList({commit}, {page = 1, type = 0}) {
      let {data} = await http.post(['ProductOrderIn/GetList', 'BeadhouseRoomReserveOrder/GetAppList'][type], {
        pageSize: PAGE_SIZE,
        pageIndex: page,
        orderby: ''
      })
      page == 1 && commit('clearUserOrderList')
      data.Code == 1 && commit('setUserOrderList', JSON.parse(data.List))
      return data.Count || 0
    },
    async getProductStream({commit}, {page = 1}) {
      let {data} = await http.post('UserProductStream/GetModelListByUserID', {
        pageSize: PAGE_SIZE,
        pageIndex: page,
        orderby: '',
        strSearchName: ''
      })
      page == 1 && commit('clearProductStream')
      data.Code == 1 && commit('setProductStream', data.List)
      return data.Count || 0
    },
    async getUserProduct({commit}, {page = 1, bid = ''}) {
      let {data} = await http.post('UserProduct/GetModelListByUserAndBeadhouse', {
        pageSize: PAGE_SIZE,
        pageIndex: page,
        orderby: '',
        strSearchName: '',
        BeadhouseID: bid
      })
      page == 1 && commit('clearUserProduct')
      data.Code == 1 && commit('setUserProduct', {
        items: data.List,
        count: data.Count
      })
      return data.Count || 0
    },
    async getUserInfo({commit}, id) {
      let {data} = await http.post('User/GetModel')
      if (data.Code == 1) {
        data.UserInfo.IsSellPassword = data.IsSellPassword
        commit('setUserInfo', data.UserInfo)
      }
    },
    async wxPay({commit}, dt) {
      let {data} = await http.post('Pay/WxPay', dt)
      return data
    },
    async Alipay({commit}, dt) {
      let {data} = await http.post('Pay/AliPay', dt)
      return data
    },
    async getOrder({commit}, {id, type}) {
      let api = ['ProductOrderIn', 'BeadhouseRoomReserveOrder'][type]
      let {data} = await http.post(api + '/GetModel', {
        id: id
      })
      data.Code == 1 && commit('setOrder', data.Model)
    },
    async getRoomPic({commit}, dt) {
      let {data} = await http.post('BeadhouseRoomAttachment/GetAttachment', dt)
      data.Code == 1 && commit('setRoomPic', JSON.parse(data.qyzz))
    },
    async getRoom({commit}, dt) {
      let {data} = await http.post('BeadhouseRoomType/GetModel', dt)
      data.Code == 1 && commit('setRoom', data.Model)
    },
    async getRoomList({commit}, dt) {
      let {data} = await http.post('BeadhouseRoomType/GetList', {
        pageSize: PAGE_SIZE,
        pageIndex: 1,
        orderby: '',
        ...dt
      })
      data.Code == 1 && commit('setRoomList', JSON.parse(data.List))
    },
    async getVillaPic({commit}, dt) {
      let {data} = await http.post('BeadhouseAttachment/GetAttachment', dt)
      data.Code == 1 && commit('setVillaPic', JSON.parse(data.qyzz))
    },
    async getVilla({commit}, dt) {
      let {data} = await http.post('Beadhouse/GetModel', dt)
      data.Code == 1 && commit('setVilla', data.Model)
    },
    async getProductPic({commit}, dt) {
      let {data} = await http.post('ProductAttachment/GetAttachment', dt)
      data.Code == 1 && commit('setProductPic', JSON.parse(data.qyzz))
    },
    async getProduct({commit}, dt) {
      let {data} = await http.post('Product/GetModel', dt)
      data.Code == 1 && commit('setProduct', data.Model)
    },
    async getVillaList({commit}, {page = 1}) {
      let {data} = await http.post('Beadhouse/GetList', {
        pageSize: PAGE_SIZE,
        pageIndex: page,
        orderby: '',
        strSearchName: ''
      })
      page == 1 && commit('clearVillaList')
      data.Code == 1 && commit('setVillaList', JSON.parse(data.List))
      return data.Count || 0
    },
    async getHomeList({commit}, {page = 1}) {
      let {data} = await http.post('Product/GetList', {
        pageSize: PAGE_SIZE,
        pageIndex: page,
        orderby: ''
      })
      page == 1 && commit('clearHomeList')
      data.Code == 1 && commit('setHomeList', JSON.parse(data.List))
      return data.Count || 0
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
      if (!state.SmsID) {
        return {
          Code: 2,
          Message: '请先获取验证码'
        }
      }
      let {data} = await http.post('SysSMS/IsValidateCodeByDeviceID', {
        SmsID: state.SmsID,
        Phone: state.SmsPhone,
        ...dt
      })
      data.Code == 1 && commit('setSmsCode', dt)
      return data
    },
    async wxReg({state, commit}, dt) {
      if (!state.SmsID) {
        return {
          Code: 2,
          Message: '请先获取验证码'
        }
      }
      let {data} = await http.post('User/AppAddInfo', {
        SmsID: state.SmsID,
        Phone: state.SmsPhone,
        wXOpenID: state.wxInfo.openid,
        fullName: state.wxInfo.nickname,
        avator: state.wxInfo.headimgurl,
        ...dt
      })
      data.Code == 1 && commit('setUserKey', data.UserKey)
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
    async buyProduct({commit}, dt) {
      let {data} = await http.post('ProductOrderIn/Addinfo', dt)
      return data
    },
    async dklPay({commit}, dt) {
      let {data} = await http.post('Pay/DklPay', dt)
      return data
    }
  }
})