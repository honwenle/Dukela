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
import { LoadingPlugin, ToastPlugin, XHeader } from 'vux'

Vue.component('x-header', XHeader)
Vue.component('font-icon', FontIcon)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)

Vue.prototype.$baseURL = url.baseURL
Vue.prototype.$http = http

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
window.api || window.apiready()
