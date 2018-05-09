import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Home from '@/pages/home'
import Order from '@/pages/order'
import Mall from '@/pages/mall'
import Me from '@/pages/me'
import Main from '@/pages/main'
import User from '@/pages/user'
import MyGoods from '@/pages/my-goods'
import MyOrder from '@/pages/my-order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { keepAlive: true }
    }, {
      path: '/',
      name: 'Main',
      component: Main,
      meta: { keepAlive: true },
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home,
          meta: { keepAlive: true }
        }, {
          path: '/order',
          name: 'Order',
          component: Order,
          meta: { keepAlive: true }
        }, {
          path: '/mall',
          name: 'Mall',
          component: Mall,
          meta: { keepAlive: true }
        }, {
          path: '/me',
          name: 'Me',
          component: Me,
          meta: { keepAlive: true }
        }
      ]
    }, {
      path: '/user',
      name: 'User',
      component: User,
      meta: { keepAlive: true }
    }, {
      path: '/my-goods',
      name: 'MyGoods',
      component: MyGoods,
      meta: { keepAlive: true }
    }, {
      path: '/my-order',
      name: 'MyOrder',
      component: MyOrder,
      meta: { keepAlive: true }
    }
  ]
})
