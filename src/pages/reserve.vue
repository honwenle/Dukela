<template>
  <div>
    <div class="theme-bg">
      <d-header :tran="true">入住预定</d-header>
      <div class="top-tran">
        <div>大床房</div>
        <span class="feature-item" v-for="(item, i) in ['厨房','空调','洗衣机','独卫']" :key="i">{{item}}</span>
      </div>
    </div>
    <group label-width="100px">
      <x-input title="房间数" value="1间" disabled></x-input>
      <x-input title="入住人" placeholder="请填写姓名，需和身份证一致"></x-input>
      <x-input title="身份证" placeholder="请填写身份证号码"></x-input>
      <x-input title="联系手机" placeholder="请填写手机号码"></x-input>
      <datetime title="入住时间" placeholder="请选择"></datetime>
      <datetime title="离开时间" placeholder="请选择"></datetime>
    </group>
    <group>
      <cell title="商品抵扣" :link="{name: 'Pay'}"></cell>
    </group>
    <div class="bottom-bar">
      <div class="flex">
        <div class="flex-2 text-right">现金:400元　T值:395元</div>
        <div class="flex-1 btn-sm" @click="submitOrder">确定无误</div>
      </div>
    </div>
  </div>
</template>
<script>
import {XInput, XNumber, Datetime} from 'vux'
export default {
  components: {XInput, XNumber, Datetime},
  methods: {
    submitOrder() {
      // TODO: 提交订单
      this.$router.push({
        name: 'Pay',
        query: {
          deduct: 1
        }
      })
    }
  }
}
</script>
<style scoped>
.top-tran{
  background: rgba(255, 255, 255, .3);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin: 0 12px;
  padding: 25px 20px 20px;
  color: #fff;
}
</style>
