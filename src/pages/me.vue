<template>
  <div class="win-wrap">
    <div class="top" :class="{'unlogin': !UserKey}">
      <d-header :tran="true" :showBack="false">
        <span slot="right" @click="$router.push({name: 'Settings'})">设置</span>
      </d-header>
      <div @click="$router.push({name: 'User'})">
        <div class="avatar">
          <img :src="dataInfo.Avator || require('../assets/user.png')">
        </div>
        <div class="nick">{{dataInfo.FullName || '点击设置更多'}}</div>
      </div>
    </div>
    <group :gutter="0">
      <cell title="我的商品库" link="my-goods"></cell>
      <cell title="我的订单" link="my-order"></cell>
      <cell title="我的消息" link="messages">
        <badge v-if="msgList" :text="msgList"></badge>
      </cell>
      <cell title="客服电话" is-link>
        <span class="theme-color"><font-icon name="phone"></font-icon></span>
        <a class="theme-color" href="tel:057786588682">0577-86588682</a>
      </cell>
    </group>
  </div>
</template>
<script>
import { Group, Cell, Badge } from 'vux'
export default {
  components: {
    Group, Cell, Badge
  },
  computed: {
    dataInfo() {
      return this.$store.state.UserInfo
    },
    UserKey() {
      return this.$store.state.UserKey
    },
    msgList() {
      return this.$store.state.UserMessage.length
    }
  },
  mounted() {
    this.UserKey && this.$store.dispatch('getUserInfo')
    this.UserKey && this.$store.dispatch('getUserMessage')
  }
}
</script>

<style scoped>
.top{
  padding-bottom: 30px;
  text-align: center;
  color: #fff;
  background-color: radial-gradient(at 50% 75%, #91c9ff, #5194ff);
  background-image: url('../assets/bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
.top.unlogin{
  /* background-image: url('../assets/bg0.jpg'); */
  filter: grayscale(100%);
}
.avatar {
  width: 75px;
  height: 75px;
  margin: auto;
}
.avatar img {
  width: 100%;
  border-radius: 100%;
}
</style>
