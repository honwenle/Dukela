<template>
  <div>
    <template v-if="$route.name != 'Me'">
      <d-header :showBack="false">
        都可拉
        <router-link v-if="!UserKey" slot="right" to="login" style="color: #60b63c">登录/注册</router-link>
      </d-header>
    </template>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <tabbar>
      <tabbar-item
        v-for="(item, i) in tabList"
        :key="i"
        :link="tabRouter(item.route)"
        :selected="$route.name == item.route">
        <font-icon slot="icon" :name="item.icon" fontsize="22px"></font-icon>
        <span slot="label">{{item.label}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
import {Tabbar, TabbarItem} from 'vux'
export default {
  components: {Tabbar, TabbarItem},
  computed: {
    UserKey() {
      return this.$store.state.UserKey
    }
  },
  data() {
    return {
      tabList: [
        {
          label: '首页',
          icon: this.$route.name == 'Home' ? 'dukela1' : 'dukela',
          route: 'Home'
        }, {
          label: '入住预定',
          icon: 'order',
          route: 'villaList'
        // }, {
        //   label: '衍生商品城',
        //   icon: 'gift',
        //   route: 'Mall'
        }, {
          label: '我的',
          icon: 'wo',
          route: 'Me'
        }
      ]
    }
  },
  methods: {
    tabRouter(name) {
      return {
        name: name,
        replace: true
      }
    }
  }
}
</script>

