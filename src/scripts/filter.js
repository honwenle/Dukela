import url from './url'
import Vue from 'vue'
import {dateFormat} from 'vux'

Vue.filter('decimal4to2', function (num) {
  return Math.floor((Math.ceil(num * 10000)/10000) * 100)/100
})
Vue.filter('decimal', function (num) {
  return Math.floor(num * 100)/100
})
Vue.filter('decimal4', function (num) {
  return Math.floor(num * 10000)/10000
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
  return (type == 3 || type == 5 || type == 6) ? 'record-outcome' : 'record-income'
})
Vue.filter('isWelfare', function (type) {
  return (type > 2 && type < 6) ? 'record-outcome' : 'record-income'
})
Vue.filter('hidePhone', function (tel = '') {
  return tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
})
Vue.filter('goodsRecordTypeName', function (type) {
  return ['其它', '商品买入', '商品分红', '商品入住抵扣', '退款', '赠送', '转让', '转让失败', '接受赠送'][type]
})
Vue.filter('welfareTypeName', function (type) {
  return ['其它', '按照W分现金', '按照W分商品', '按照商品金额分商品'][type]
})
Vue.filter('welfareRecordTypeName', function (type) {
  return ['其它', '商品买入', '商品分红', '赠送', '转让', '转让失败', '接受赠送'][type]
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
Vue.filter('balanceTypeName', function (type) {
  return ['其它', '分红收入', '推广收入', '买入商品支出', '预约入住支出', '提现支出', '退款'][type]
})
Vue.filter('payTypeName', function (type) {
  return ['商品支付', '余额支付', '微信支付', '支付宝支付', '银联支付', '线下转账', '商品赠送'][type]
})
Vue.filter('orderStatusName', function (type) {
  return ['未支付', '已支付', '已退款', '已完成', '交易关闭', '待审核', '退款中'][type]
})
Vue.filter('reserveStatusName', function (type) {
  return ['未支付', '已支付', '已退款', '预约成功', '交易关闭'][type]
})
Vue.filter('reserveStatusTitle', function (type) {
  return ['待支付', '您的订单已支付，待审核', '您的订单审核未通过，3个工作日内退款', '您的房间已预定成功', '您的订单已取消'][type]
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