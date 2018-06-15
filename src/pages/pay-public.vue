<template>
  <div>
    <d-header>对公账户</d-header>
    <div class="cell">都可拉账户</div>
    <div class="group">
      <div class="cell">
        <div class="row-gap">
          <span class="gray">用户名：</span>浙江都可拉网络科技有限公司
        </div>
        <div class="row-gap">
          <span class="gray">银行：</span>中国工商银行
        </div>
        <div class="row-gap">
          <span class="gray">开户行：</span>温州经济技术开发区支行教育新村分理处
        </div>
        <div class="row-gap">
          <span class="gray">账号：</span>1203006819000061501
        </div>
      </div>
    </div>
    <div class="cell">打款账户</div>
    <div class="group buy-group">
      <div class="cell">请输入打款账号</div>
      <div class="cell cell-input">
        <input type="text" v-model="bankno" placeholder="请输入账号">
      </div>
    </div>
    <div class="btn-full" @click="ok">确定</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bankno: ''
    }
  },
  computed: {
    id() {
      return this.$store.state.OrderDetail.ID
    }
  },
  methods: {
    async ok() {
      if (this.bankno == '') {
        this.$vux.toast.text('请输入打款账户')
      }
      let data = await this.$store.dispatch('dklPay', {
        OrderID: this.id,
        BankNo: this.bankno
      })
      if (data.Code == 1) {
        this.$vux.alert.show({
          content: '请务必24小时之内打款！',
          onHide () {
            console.log('我知道了')
          }
        })
      } else {
        this.$vux.toast.text(data.Message)
      }
    }
  }
}
</script>

<style scoped>
.cell-input{
  padding-bottom: 16px;
}
.cell-input input {
  border: 1px solid #eee;
  height: 34px;
  width: 100%;
  border-radius: 50px;
  padding: 0 16px;
  box-sizing: border-box;
  -webkit-appearance: none;
}
.row-gap .gray{
  width: 60px;
}
</style>
