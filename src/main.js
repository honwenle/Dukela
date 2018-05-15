// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import store from './store'
import FontIcon from '@/components/font-icon/index.vue'
import axios from 'axios'
import qs from 'qs'
import { LoadingPlugin, ToastPlugin, XHeader } from 'vux'

Vue.component('x-header', XHeader)
Vue.component('font-icon', FontIcon)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)

let baseURL
if (location.host.indexOf('localhost') > -1) {
  baseURL = 'http://WeiXin.Doukela.com/WeiXin/'
} else {
  baseURL = 'http://WeiXin.Doukela.com/WeiXin/'
}
axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = true
axios.interceptors.request.use(function (config) {
  if (config.data) {
    config.data = qs.stringify(config.data)
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
Vue.prototype.$baseURL = baseURL
Vue.prototype.$http = axios

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
