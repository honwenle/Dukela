import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/pages/main'
import Login from '@/pages/login'
import Register from '@/pages/register'
import SetPassword from '@/pages/set-password'
import Realname from '@/pages/realname'
import Realname2 from '@/pages/realname2'
import Realname3 from '@/pages/realname3'
import BindCard from '@/pages/bind-card'

import Home from '@/pages/home'
import villaList from '@/pages/villaList'
import Goods from '@/pages/goods'
import Villa from '@/pages/villa'
import Room from '@/pages/room'
import Reserve from '@/pages/reserve'
import Result from '@/pages/result'
import Buy from '@/pages/buy'
import Pay from '@/pages/pay'

import Mall from '@/pages/mall'

import Me from '@/pages/me'
import Settings from '@/pages/settings'
import User from '@/pages/user'
import MyGoods from '@/pages/my-goods'
import GoodsRecord from '@/pages/goods-record'
import Detail from '@/pages/detail'
import MyOrder from '@/pages/my-order'
import Messages from '@/pages/messages'
import ChangePhone from '@/pages/change-phone'
import ChangePhone2 from '@/pages/change-phone2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/change-phone',
      name: 'ChangePhone',
      component: ChangePhone
    },
    {
      component: ChangePhone2,
      path: '/change-phone2'
    },
    {
      path: '/messages',
      name: 'Messages',
      component: Messages
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },{
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: { keepAlive: true }
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { keepAlive: true }
    }, {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { keepAlive: true }
    }, {
      path: '/set-password',
      name: 'SetPassword',
      component: SetPassword,
      meta: { keepAlive: true }
    }, {
      path: '/realname',
      name: 'Realname',
      component: Realname
    }, {
      path: '/realname2',
      name: 'Realname2',
      component: Realname2
    }, {
      path: '/realname3',
      name: 'Realname3',
      component: Realname3
    }, {
      path: '/bindcard',
      name: 'BindCard',
      component: BindCard
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
          path: '/villaList',
          name: 'villaList',
          component: villaList,
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
      path: '/goods-record',
      name: 'GoodsRecord',
      component: GoodsRecord,
      meta: { keepAlive: true }
    }, {
      path: '/my-order',
      name: 'MyOrder',
      component: MyOrder,
      meta: { keepAlive: true }
    }, {
      path: '/goods',
      name: 'Goods',
      component: Goods
    }, {
      path: '/buy',
      name: 'Buy',
      component: Buy
    }, {
      path: '/pay',
      name: 'Pay',
      component: Pay
    }, {
      path: '/villa',
      name: 'Villa',
      component: Villa
    }, {
      path: '/room',
      name: 'Room',
      component: Room
    }, {
      path: '/reserve',
      name: 'Reserve',
      component: Reserve
    }, {
      path: '/result',
      name: 'Result',
      component: Result
    }
  ]
})
