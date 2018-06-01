// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import store from './store'
import url from './scripts/url'
import http from './scripts/http'
import FontIcon from '@/components/font-icon/index.vue'
import DHeader from '@/components/dkl-header.vue'
import List from '@/components/list.vue'
import SmsSend from '@/components/sms-send'
import { LoadingPlugin, ToastPlugin, XHeader,
  AlertPlugin, ConfirmPlugin,
  Group, Cell, Scroller, dateFormat } from 'vux'

Vue.component('list', List)
Vue.component('x-header', XHeader)
Vue.component('d-header', DHeader)
Vue.component('font-icon', FontIcon)
Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('scroller', Scroller)
Vue.component('sms-send', SmsSend)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)

Vue.prototype.$imgUrl = url.imgUrl
Vue.prototype.$baseURL = url.baseURL
Vue.prototype.$http = http
let isApp = navigator.userAgent.indexOf('dukela') > -1
Vue.prototype.isApp = isApp

Vue.filter('isIncome', function (type) {
  return type < 3 ? 'record-income' : 'record-outcome'
})
Vue.filter('typeName', function (type) {
  return ['无', '商品购买', '商品分红'][type]
})
Vue.filter('DATEFORMAT', function (strDate) {
  const intTime = strDate.match(/\d{13}/)
  return intTime && dateFormat(new Date(parseInt(intTime)), 'YYYY-MM-DD HH:mm:ss')
})
Vue.filter('PAYDATEFORMAT', function (strDate) {
  return dateFormat(new Date(parseInt(strDate.match(/\d{13}/)) + 60*30*1000), 'YYYY-MM-DD HH:mm:ss')
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
window.apiready = function(){
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app-box')
}
isApp || window.apiready()

// 路由守卫 登录限制
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    if (localStorage.getItem('UserKey')) {
      next()
    } else {
      Vue.$vux.confirm.show({
        title: '操作提示',
        content: '是否立即登录',
        onCancel() {
          next(false)
        },
        onConfirm() {
          next({name: 'Login'})
        }
      })
    }
  } else {
    next()
  }
})
