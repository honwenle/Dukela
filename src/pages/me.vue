<template>
  <div class="win-wrap">
    <div class="top">
      <div class="avatar">
          <img :src="infoData.Avator" @click="$router.push({name: 'User'})">
      </div>
      <div class="nick">{{infoData.FullName}}</div>
    </div>
    <group :gutter="0">
      <cell title="我的商品库" link="my-goods"></cell>
      <cell title="我的订单" link="my-order"></cell>
      <cell title="客服电话">
        <a href="tel:4000000000">点击拨打400-000-0000</a>
      </cell>
    </group>
  </div>
</template>
<script>
import { Group, Cell } from 'vux'
export default {
  components: {
    Group, Cell
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
      if (data.Code == 1) {
        this.infoData = data.Model
      }
    }
  }
}
</script>

<style scoped>
.top{
  padding: 30px;
  text-align: center;
  color: #fff;
  background-color: radial-gradient(at 50% 75%, #91c9ff, #5194ff);
  background-image: url('../assets/bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
.avatar {
  width: 30%;
  margin: auto;
}
.avatar img {
  width: 100%;
  border-radius: 100%;
}
.weui-cell a{
  color: #c8c8cd;
}
</style>
