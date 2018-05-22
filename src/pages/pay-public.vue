<template>
  <div>
    <x-header>对公账户</x-header>
    <div class="cell">都克拉账户</div>
    <div class="group">
      <div class="cell">
        <div>用户名：浙江都克拉网络科技有限公司</div>
        <div>银行：中国农业银行</div>
        <div>开户行：*****</div>
        <div>账号：123456</div>
      </div>
    </div>
    <div class="cell">打款账户</div>
    <div class="group buy-group">
      <div class="cell">请输入打款账号</div>
      <div class="cell cell-input">
        <input type="text" placeholder="请输入账号">
      </div>
    </div>
    <div class="btn-full" @click="ok">确定</div>
  </div>
</template>
<script>
export default {
  methods: {
    ok() {
      this.$vux.alert.show({
        content: '请务必24小时之内打款！',
        onHide () {
          console.log('我知道了')
        }
      })
    }
  }
}
</script>

<style scoped>
.cell-input input {
  border: 1px solid #eee;
  height: 34px;
  width: 100%;
  border-radius: 50px;
  padding: 0 16px;
  box-sizing: border-box;
}
</style>
