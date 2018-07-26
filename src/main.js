// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import store from './store'
import url from './scripts/url'
import http from './scripts/http'
require('./scripts/filter')
import FontIcon from '@/components/font-icon/index.vue'
import DHeader from '@/components/dkl-header.vue'
import List from '@/components/list.vue'
import SmsSend from '@/components/sms-send'
import SubmitBar from '@/components/submit-bar'
import Protocol from '@/components/protocol'
import TodayT from '@/components/todayT'
import Vcode from '@/components/vcode'
import Password from '@/components/password'
import Tw from '@/components/tw'
import { LoadingPlugin, ToastPlugin, XHeader,
  AlertPlugin, ConfirmPlugin, XInput, Countdown,
  Group, Cell, Scroller, Swiper,
  Tab, TabItem, XNumber, Popup } from 'vux'

Vue.component('tw', Tw)
Vue.component('password', Password)
Vue.component('popup', Popup)
Vue.component('today-t', TodayT)
Vue.component('countdown', Countdown)
Vue.component('submit-bar', SubmitBar)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('swiper', Swiper)
Vue.component('list', List)
Vue.component('vcode', Vcode)
Vue.component('x-header', XHeader)
Vue.component('x-input', XInput)
Vue.component('x-number', XNumber)
Vue.component('d-header', DHeader)
Vue.component('font-icon', FontIcon)
Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('scroller', Scroller)
Vue.component('protocol', Protocol)
Vue.component('sms-send', SmsSend)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)

Vue.prototype.$imgUrl = url.imgUrl
Vue.prototype.$baseURL = url.baseURL
Vue.prototype.$http = http
let isApp = navigator.userAgent.indexOf('dukela') > -1
console.log(navigator.userAgent)
Vue.prototype.isApp = isApp

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
window.apiready = function(){
  Vue.prototype.version = isApp ? window.api.appVersion : 'web'
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
        title: '请登录',
        content: '登录后才可继续操作',
        confirmText: '去登录',
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
router.afterEach((to, from) => {
  if (from.params.jump) {
    router.push(from.params.jump)
  }
})
