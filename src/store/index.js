import Vue from 'vue'
import Vuex from 'vuex'
import http from '../scripts/http'
Vue.use(Vuex)
const PAGE_SIZE = 10
export default new Vuex.Store({
  state: {
    homeList: [],
    villaList: [],
    SmsID: '',
    SmsPhone: '',
    SmsVCode: '',
    InvitationCode: '',
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
    UserReserveList: [],
    UserMessage: [],
    ProductStream: [],
    ShareStream: [],
    deduct: {},
    goodsCount: 0,
    goodsNumber: 0,
    Config: {
      TProportion: 0,
      MinWithdrawalsAmount: 0
    },
    wxInfo: {},
    UserTotal: {},
    AchievementList: [],
    Balance: [],
    Welfare: [],
    newsList: [],
    helpList: [],
    helpDetail: {},
    balanceDetail: {},
    transferGoods: {},
    RecordDetail: {}
  },
  mutations: {
    setInvitationCode(state, code) {
      state.InvitationCode = code
    },
    setRecordDetail(state, data) {
      state.RecordDetail = data
    },
    setHelpDetail(state, data) {
      state.helpDetail = data
    },
    setHelpList(state, items = []) {
      state.helpList = state.helpList.concat(items)
    },
    clearHelpList(state) {
      state.helpList = []
    },
    setTransferGoods(state, data) {
      state.transferGoods = data
    },
    setBalanceDetail(state, data) {
      state.balanceDetail = data
    },
    setUserTotal(state, data) {
      state.UserTotal = data
    },
    setWxInfo(state, data) {
      state.wxInfo = data
    },
    setConfig(state, data) {
      state.Config = data
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
    setUserReserveList(state, items = []) {
      state.UserReserveList = state.UserReserveList.concat(items)
    },
    clearUserReserveList(state) {
      state.UserReserveList = []
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
    clearUserInfo(state) {
      try {
        var push = api.require('push')
        push.unbind({
          userName: state.UserInfo.UserName,
          userId: state.UserInfo.IDName
        }, function(ret,err){
          if(ret.status){
            console.log({msg:'解除绑定成功'})
          }else{
            api.alert({msg:err.msg})
          }
        })
      } catch (e) {
        console.log(e, '不在APP内无法解绑通知')
      }
      localStorage.removeItem('UserKey')
      state.UserKey = ''
      state.UserInfo = {}
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
    clearOrder(state) {
      state.OrderDetail = {}
    },
    setUserInfo(state, data) {
      try {
        var push = api.require('push')
        push.bind({
          userName: data.UserName,
          userId: data.IDName
        }, function(ret,err) {
          if(ret.status) {
              console.log({msg:'绑定成功'})
          } else {
              api.alert({msg:err.msg})
          }
        })
      } catch (e) {
        console.log(e, '不在APP内无法绑定通知')
      }
      state.UserInfo = data
    },
    setUserProduct(state, {items = [], count, num}) {
      state.UserProduct = state.UserProduct.concat(items)
      state.goodsCount = count
      state.goodsNumber = num
    },
    clearUserProduct(state) {
      state.UserProduct = []
      state.goodsCount = 0
      state.goodsNumber = 0
    },
    setBalance(state, items = []) {
      state.Balance = state.Balance.concat(items)
    },
    clearBalance(state) {
      state.Balance = []
    },
    setWelfare(state, items = []) {
      state.Welfare = state.Welfare.concat(items)
    },
    clearWelfare(state) {
      state.Welfare = []
    },
    setProductStream(state, items = []) {
      state.ProductStream = state.ProductStream.concat(items)
    },
    clearProductStream(state) {
      state.ProductStream = []
    },
    setShareStream(state, items = []) {
      state.ShareStream = state.ShareStream.concat(items)
    },
    clearShareStream(state) {
      state.ShareStream = []
    },
    setAchievementList(state, items = []) {
      state.AchievementList = state.AchievementList.concat(items)
    },
    clearAchievementList(state) {
      state.AchievementList = []
    },
    setNews(state, items = []) {
      state.newsList = state.newsList.concat(items)
    },
    clearNews(state) {
      state.newsList = []
    }
  },
  actions: {
    async getHelpList({commit}, {page = 1}) {
      let {data} = await http.post('Help/GetList', {
        pageSize: PAGE_SIZE,
        pageIndex: page,
        orderby: ''
      })
      page == 1 && commit('clearHelpList')
      if (data.Code == 1) {
        commit('setHelpList', JSON.parse(data.List))
      }
      return data.Count || 0
    },
    async getNews({commit}, {page = 1}) {
      let {data} = await http.post('News/GetList', {
        pageSize: PAGE_SIZE,
        pageIndex: page,
        orderby: ''
      })
      page == 1 && commit('clearNews')
      if (data.Code == 1) {
        commit('setNews', JSON.parse(data.List))
      }
      return data.Count || 0
    },
    async getAchievementList({commit}, {page = 1}) {
      let {data} = await http.post('Achievement/GetAppList', {
        pageSize: PAGE_SIZE,
        pageIndex: page,
        orderby: '',
        strSearchName: '',
        Type: 0
      })
      page == 1 && commit('clearAchievementList')
      data.Code == 1 && commit('setAchievementList', JSON.parse(data.List))
      return data.Count || 0
    },
    async getUserTotal({commit}) {
      let {data} = await http.post('User/GetTotal')
      data.Code == 1 && commit('setUserTotal', JSON.parse(data.List)[0])
    },
    async getConfig({commit}) {
      let {data} = await http.post('SysConfig/GetModel', {
        ID: 1
      })
      data.Code == 1 && commit('setConfig', data.Info)
    },
    async getUserMessage({commit}, {page = 1}) {
      let {data} = await http.post('UserMessage/GetList', {
        pageSize: PAGE_SIZE,
        pageIndex: page,
        orderby: ''
      })
      page == 1 && commit('clearUserMessage')
      if (data.Code == 1) {
        commit('setUserMessage', data.List.map(item => {
          item.Content = JSON.parse(item.Content)
          return item
        }))
      }
      return data.Count || 0
    },
    async getUserOrderList({commit}, {page = 1, type = 0}) {
      let {data} = await http.post(['ProductOrderIn/GetList', 'BeadhouseRoomReserveOrder/GetAppList'][type], {
        pageSize: PAGE_SIZE,
        pageIndex: page,
        orderby: ''
      })
      page == 1 && commit(['clearUserOrderList', 'clearUserReserveList'][type])
      data.Code == 1 && commit(['setUserOrderList', 'setUserReserveList'][type], JSON.parse(data.List))
      return data.Count || 0
    },
    async getProductStream({commit}, {page = 1}) {
      let {data} = await http.post('UserProductStream/GetModelListByUserID', {
        pageSize: 15,
        pageIndex: page,
        orderby: '',
        strSearchName: ''
      })
      page == 1 && commit('clearProductStream')
      data.Code == 1 && commit('setProductStream', data.List)
      return data.Count || 0
    },
    async getShareStream({commit}, {page = 1}) {
      let {data} = await http.post('UserShareSteam/GetList', {
        pageSize: 15,
        pageIndex: page,
        orderby: '',
        strSearchName: ''
      })
      page == 1 && commit('clearShareStream')
      data.Code == 1 && commit('setShareStream', JSON.parse(data.List))
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
        items: JSON.parse(data.List),
        count: data.Count,
        num: data.Number
      })
      return data.Count || 0
    },
    async getBalance({commit}, {page = 1}) {
      let {data} = await http.post('AccountBalance/GetList', {
        pageSize: PAGE_SIZE,
        pageIndex: page,
        orderby: '',
        strSearchName: ''
      })
      page == 1 && commit('clearBalance')
      data.Code == 1 && commit('setBalance', JSON.parse(data.List))
      return data.Count || 0
    },
    async getWelfare({commit}, {page = 1}) {
      let {data} = await http.post('UserDividend/GetList', {
        pageSize: PAGE_SIZE,
        pageIndex: page,
        orderby: '',
        strSearchName: ''
      })
      page == 1 && commit('clearWelfare')
      data.Code == 1 && commit('setWelfare', JSON.parse(data.List))
      return data.Count || 0
    },
    async getUserInfo({dispatch, commit}, id) {
      let {data} = await http.post('User/GetModel')
      if (data.Code == 1) {
        data.UserInfo.IsSellPassword = data.IsSellPassword
        data.UserInfo.IsLoginPassword = data.IsLoginPassword
        commit('setUserInfo', data.UserInfo)
      }
      dispatch('getUserTotal')
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
      if (data.Code == 1) {
        let villa = data.BeadhouseModel
        let room = data.RoomTypeModel
        if (villa && room) {
          data.Model.Room = {
            BeadhouseName: villa.BeadhouseName,
            Address: villa.ProvinceName + villa.CityName + villa.AreaName + villa.Address,
            TypeName: room.Name,
            RoomPrice: room.RoomPrice,
            RoomSize: room.RoomSize,
            ContactTel: villa.ContactTel,
            TypeType: room.TypeName
          }
        }
        commit('setOrder', data.Model)
      }
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
      commit('setRoomList', data.Code == 1 ? JSON.parse(data.List) : [])
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
        orderby: '',
        IsSelf: 1
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
        NickName: state.wxInfo.nickname,
        avator: state.wxInfo.headimgurl,
        // Sex: state.wxInfo.sex,
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
        InvitationCode: state.InvitationCode,
        ...dt
      })
      if (data.Code == 1) {
        if (!sessionStorage.getItem('isSubAccount')) {
          commit('setUserKey', data.Model)
        }
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