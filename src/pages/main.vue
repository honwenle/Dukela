<template>
  <div>
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
  data() {
    return {
      tabList: [
        {
          label: '首页',
          icon: 'home',
          route: 'Home'
        }, {
          label: '入住预定',
          icon: 'order',
          route: 'Order'
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

