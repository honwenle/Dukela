<template>
  <div>
    <x-header>商品买入</x-header>
    <div class="group">
      <div class="top-tip">今日T值：0.5元/份</div>
      <div class="cell">山庄项目1</div>
      <div class="cell">￥ 2元</div>
    </div>
    <div class="group buy-group">
      <div class="cell">请输入购买份数</div>
      <div class="cell cell-input">
        <input type="text" placeholder="1000份起售">
      </div>
      <div class="cell">得到***T     **份份额</div>
    </div>
    <div class="group buy-group">
      <div class="cell">如有邀请人，请输入邀请人的邀请码</div>
      <div class="cell cell-input">
        <input type="text" placeholder="请输入邀请码">
      </div>
    </div>
    <div class="bottom-bar">
      <div class="flex">
        <div class="flex-2 text-right">总价￥300.00</div>
        <div class="flex-1 btn-sm" @click="submitOrder">确定转出</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    submitOrder() {
      // TODO: 提交订单
      this.$router.push({
        name: 'Pay',
        query: {
          offline: 1
        }
      })
    }
  }
}
</script>
<style scoped>
.buy-group{
  font-size: 14px;
  padding: 10px;
}
.top-tip{
  background: #f4f9fe;
  text-align: center;
  padding: 12px;
}
.cell-input input {
  border: 1px solid #eee;
  height: 34px;
  width: 100%;
  border-radius: 50px;
  padding: 0 16px;
  box-sizing: border-box;
}
</style>
