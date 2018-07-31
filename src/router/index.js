import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/pages/main'
import Login from '@/pages/login'
import Register from '@/pages/register'
import SetPassword from '@/pages/set-password'
import SetTranPwd from '@/pages/set-tran-pwd'
import Realname from '@/pages/realname'
import BindCard from '@/pages/bind-card'
import BindAccount from '@/pages/bind-account'
import WxReg from '@/pages/wx-reg'

import Home from '@/pages/home'
import villaList from '@/pages/villaList'
import Goods from '@/pages/goods'
import Villa from '@/pages/villa'
import BDMap from '@/pages/map'
import Room from '@/pages/room'
import Reserve from '@/pages/reserve'
import Deduct from '@/pages/deduct'
import Result from '@/pages/result'
import Buy from '@/pages/buy'
import PayPublic from '@/pages/pay-public'
import Pay from '@/pages/pay'

import Mall from '@/pages/mall'

import Me from '@/pages/me'
import Settings from '@/pages/settings'
import Help from '@/pages/help'
import HelpDetail from '@/pages/help-detail'
import Feedback from '@/pages/feedback'

import User from '@/pages/user'
import MyGoods from '@/pages/my-goods'
import GoodsRecord from '@/pages/goods-record'
import RecordDetail from '@/pages/record-detail'
import Detail from '@/pages/detail'
import DetailReserve from '@/pages/detail-reserve'
import MyOrder from '@/pages/my-order'
import Messages from '@/pages/messages'
import ChangePhone from '@/pages/change-phone'
import CheckPhone from '@/pages/check-phone'
import MyRealname from '@/pages/my-realname'
import MyPassword from '@/pages/my-password'
import MyAccount from '@/pages/my-account'
import MyBalance from '@/pages/my-balance'
import BalanceDetail from '@/pages/balance-detail'
import Refund from '@/pages/refund'
import MyPromotion from '@/pages/my-promotion'
import PromotionRecord from '@/pages/promotion-record'
import Withdraw from '@/pages/withdraw'
import News from '@/pages/news'
import WithdrawResult from '@/pages/withdraw-result'
import Transfer from '@/pages/transfer'
import GiveOther from '@/pages/give-other'
import TransList from '@/pages/trans-list'

import Version from '@/pages/version'

Vue.use(Router)

// TODO: keepAlive机制需要review
export default new Router({
  // mode: 'history',
  routes: [
    {
      component: BDMap,
      path: '/map'
    },
    {
      component: BindAccount,
      path: '/bind-account',
      meta: { needLogin: true }
    },
    {
      component: GiveOther,
      path: '/give-other',
      meta: { needLogin: true }
    },
    {
      component: TransList,
      path: '/trans-list',
      meta: { needLogin: true }
    },
    {
      component: Transfer,
      path: '/transfer',
      meta: { needLogin: true }
    },
    {
      component: BalanceDetail,
      path: '/balance-detail',
      meta: { needLogin: true }
    },
    {
      component: WithdrawResult,
      path: '/withdraw-result'
    },
    {
      component: News,
      path: '/news',
      meta: { needLogin: true }
    },
    {
      component: Withdraw,
      path: '/withdraw',
      meta: { needLogin: true }
    },
    {
      component: MyBalance,
      path: '/my-balance',
      meta: { needLogin: true }
    },
    {
      component: Refund,
      path: '/refund',
      meta: { needLogin: true }
    },
    {
      component: MyAccount,
      path: '/my-account',
      meta: { needLogin: true }
    },
    {
      component: Feedback,
      path: '/feedback'
    },
    {
      component: Help,
      path: '/help',
    },
    {
      component: HelpDetail,
      path: '/help-detail',
    },
    {
      component: PromotionRecord,
      path: '/promotion-record',
      meta: { needLogin: true }
    },
    {
      component: MyPromotion,
      path: '/my-promotion',
      meta: { needLogin: true }
    },
    {
      component: DetailReserve,
      path: '/detail-reserve'
    },
    {
      component: WxReg,
      path: '/wx-reg'
    },
    {
      component: Deduct,
      path: '/deduct'
    },
    {
      component: MyPassword,
      path: '/my-password'
    },
    {
      component: SetTranPwd,
      path: '/set-tran-pwd'
    },
    {
      component: Version,
      path: '/version'
    },
    {
      component: RecordDetail,
      path: '/record-detail'
    },
    {
      component: PayPublic,
      path: '/pay-public'
    },
    {
      component: MyRealname,
      path: '/my-realname'
    },
    {
      path: '/change-phone',
      component: ChangePhone
    },
    {
      component: CheckPhone,
      name: 'CheckPhone',
      path: '/check-phone'
    },
    {
      path: '/messages',
      name: 'Messages',
      component: Messages,
      meta: { keepAlive: true, needLogin: true }
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
      component: SetPassword
    }, {
      path: '/realname',
      name: 'Realname',
      component: Realname
    }, {
      path: '/bindcard',
      name: 'BindCard',
      component: BindCard
    }, {
      path: '/',
      component: Main,
      meta: { keepAlive: true },
      children: [
        {
          path: '',
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
      meta: { keepAlive: true, needLogin: true }
    }, {
      path: '/my-goods',
      name: 'MyGoods',
      component: MyGoods,
      meta: { needLogin: true }
    }, {
      path: '/goods-record',
      name: 'GoodsRecord',
      component: GoodsRecord,
      meta: { keepAlive: true }
    }, {
      path: '/my-order',
      name: 'MyOrder',
      component: MyOrder,
      meta: { needLogin: true }
    }, {
      path: '/goods',
      name: 'Goods',
      component: Goods
    }, {
      path: '/buy',
      name: 'Buy',
      component: Buy,
      meta: { needLogin: true }
    }, {
      path: '/pay',
      name: 'Pay',
      component: Pay,
      meta: { keepAlive: true, needLogin: true }
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
      component: Reserve,
      meta: { keepAlive: true, needLogin: true }
    }, {
      path: '/result',
      name: 'Result',
      component: Result
    }
  ]
})
