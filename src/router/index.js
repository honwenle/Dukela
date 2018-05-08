import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Me from '@/pages/me'
import User from '@/pages/user'
import MyGoods from '@/pages/my-goods'
import MyOrder from '@/pages/my-order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/me',
      name: 'Me',
      component: Me
    }, {
      path: '/user',
      name: 'User',
      component: User
    }, {
      path: '/my-goods',
      name: 'MyGoods',
      component: MyGoods
    }, {
      path: '/my-order',
      name: 'MyOrder',
      component: MyOrder
    }
  ]
})
