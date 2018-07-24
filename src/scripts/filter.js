import url from './url'
import Vue from 'vue'
import {dateFormat} from 'vux'

Vue.filter('decimal4to2', function (num) {
  return Math.floor((Math.ceil(num * 10000)/10000) * 100)/100
})
Vue.filter('decimal', function (num) {
  return Math.floor(num * 100)/100
})
Vue.filter('bannerArr', function (oList, field = 'Url') {
  return oList.map(item => {
    return {
      url: 'javascript:;',
      img: url.imgUrl + item[field],
      title: ''
    }
  })
})
Vue.filter('isIncome', function (type) {
  return type < 3 ? 'record-income' : 'record-outcome'
})
Vue.filter('hidePhone', function (tel = '') {
  return tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
})
Vue.filter('typeName', function (type) {
  return ['无', '商品购买', '商品分红'][type]
})
Vue.filter('tagColor', function (type) {
  if (type > 0 && type < 4) {
    return 'color-success'
  } else if (type == 4) {
    return 'color-disable'
  } else{
    return 'color-error'
  }
})
Vue.filter('payTypeName', function (type) {
  return ['商品支付', '余额支付', '微信支付', '支付宝支付', '银联支付'][type]
})
Vue.filter('orderStatusName', function (type) {
  return ['未支付', '已支付', '已退款', '已完成', '交易关闭', '待审核', '退款中'][type]
})
Vue.filter('reserveStatusName', function (type) {
  return ['未支付', '已支付', '已退款', '预约成功', '交易关闭'][type]
})
Vue.filter('dateFormat', dateFormat)
Vue.filter('DATEFORMAT', function (strDate, fmt = 'YYYY-MM-DD HH:mm:ss') {
  strDate = strDate || ''
  const intTime = strDate.match(/\d{13}/)
  return intTime && dateFormat(new Date(parseInt(intTime)), fmt)
})
Vue.filter('PAYDATEFORMAT', function (strDate, hours = 1) {
  strDate = strDate || ''
  return dateFormat(new Date(parseInt(strDate.match(/\d{13}/)) + hours * 60*60*1000), 'YYYY-MM-DD HH:mm:ss')
})