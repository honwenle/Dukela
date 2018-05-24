<template>
  <div>
    <d-header>入住预定</d-header>
    <div class="group">
      <div class="cell">
        <div>大床房</div>
        <span class="feature-item" v-for="(item, i) in ['厨房','空调','洗衣机','独卫']" :key="i">{{item}}</span>
      </div>
    </div>
    <group label-width="100px">
      <x-number title="房间数" :min="0" fillable align="left"></x-number>
      <x-input title="姓名" placeholder="请填写姓名"></x-input>
      <x-input title="身份证" placeholder="请填写身份证号码"></x-input>
      <x-input title="联系手机" placeholder="请填写手机号码"></x-input>
      <datetime title="入住时间" placeholder="请选择"></datetime>
      <datetime title="入住时间" placeholder="请选择"></datetime>
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
import {Group, XInput, XNumber, Datetime} from 'vux'
export default {
  components: {Group, XInput, XNumber, Datetime},
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
