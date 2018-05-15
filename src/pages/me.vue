<template>
  <div class="win-wrap">
    <div class="top">
      <div class="blue-header">
        <x-header :left-options="{showBack: false}">
          <span slot="right" @click="$router.push({name: 'Settings'})">设置</span>
        </x-header>
      </div>
      <div class="avatar">
          <img :src="infoData.Avator" @click="$router.push({name: 'User'})">
      </div>
      <div class="nick">{{infoData.FullName}}</div>
    </div>
    <group :gutter="0">
      <cell title="我的商品库" link="my-goods"><span class="blue">转让</span></cell>
      <cell title="我的订单" link="my-order"><span class="blue">共10单</span></cell>
      <cell title="我的消息" is-link><badge text="NEW"></badge></cell>
      <cell title="客服电话" is-link>
        <a class="blue" href="tel:4000000000">点击拨打400-000-0000</a>
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
  data() {
    return {
      infoData: {}
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      let {data} = await this.$http({
        method: 'post',
        url: '/User/GetUserModel'
      })
      data = {Code: 1, Model: { // TODO: ~TEST~
        Avator: 'https://media-image1.baydn.com/avatar%2Fmedia_store%2F16a83bca5aac8f45ca8af8bb8e8a51ee.png@128w_128h',
        FullName: '杏noclip'
      }}
      if (data.Code == 1) {
        this.infoData = data.Model
      }
    }
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
