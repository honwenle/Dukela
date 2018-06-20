<template>
  <div class="win-wrap">
    <div class="top" :class="{'unlogin': !UserKey}">
      <d-header :tran="true" :showBack="false">
        <span slot="right" @click="$router.push({name: 'Settings'})">设置</span>
      </d-header>
      <div class="inline-block">
        <div class="avatar">
          <img @click="$router.push({name: 'User'})" :src="dataInfo.Avator || require('../assets/user.png')">
        </div>
        <div @click="$router.push({name: 'User'})" class="nick">{{UserKey ? (dataInfo.FullName || '用户昵称') : '注册/登录'}}</div>
      </div>
    </div>
    <group :gutter="0">
      <cell title="我的商品库" link="my-goods"></cell>
      <cell title="我的订单" link="my-order"></cell>
      <cell title="我的消息" link="messages">
        <badge v-if="msgCount" :text="msgCount"></badge>
      </cell>
      <cell title="客服电话" is-link>
        <span class="theme-color"><font-icon name="phone"></font-icon></span>
        <a class="theme-color" href="tel:057788689777">0577-88689777</a>
      </cell>
    </group>
  </div>
</template>
<script>
import { Badge } from 'vux'
export default {
  components: {
    Badge
  },
  computed: {
    dataInfo() {
      return this.$store.state.UserInfo
    },
    UserKey() {
      return this.$store.state.UserKey
    },
    msgCount() {
      return this.$store.state.UserMessageCount
    }
  },
  mounted() {
    this.UserKey && this.$store.dispatch('getUserInfo')
    this.UserKey && this.$store.dispatch('getUserMessageCount', {})
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
  /* filter: grayscale(100%); */
}
.avatar {
  width: 75px;
  height: 75px;
  margin: 0 auto 15px;
}
.avatar img {
  width: 100%;
  border-radius: 100%;
}
</style>
