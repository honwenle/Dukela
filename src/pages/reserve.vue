<template>
  <div>
    <div class="theme-bg">
      <d-header :tran="true">入住预定</d-header>
      <div class="top-tran">
        <div>{{detailData.TypeName}}</div>
        <div>{{detailData.EquipmentContent}}</div>
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
      <cell title="商品抵扣" link="deduct"></cell>
    </group>
    <div class="bottom-bar">
      <div class="flex">
        <div class="flex-2 text-right">
          <div class="price">{{detailData.RoomPrice}}</div>
          <span class="gray">已抵扣50元</span>
        </div>
        <div class="flex-1 btn-sm" @click="submitOrder">确定预定</div>
      </div>
    </div>
  </div>
</template>
<script>
import {XInput, XNumber, Datetime} from 'vux'
export default {
  components: {XInput, XNumber, Datetime},
  computed: {
    detailData() {
      return this.$store.state.RoomDetail
    }
  },
  methods: {
    submitOrder() {
      // TODO: 提交订单
      this.$router.push({
        name: 'Pay'
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
