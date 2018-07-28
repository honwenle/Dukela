<template>
  <div>
    <d-header :tran="true" :theme-color="true">赠送</d-header>
    <group gutter="0">
      <cell :title="transferGoods.ProductName" :inline-desc="`持有${transferGoods.ProductCount}个`"></cell>
    </group>
    <group label-width="100px">
      <x-number fillable title="数量(个)" align="left" v-model="ProductCount" :min="1" :max="+transferGoods.ProductCount"></x-number>
      <x-input title="赠送人账户" placeholder="请填写" v-model="ToUserPhone"></x-input>
    </group>
    <tw :num="ProductCount" :pid="transferGoods.ProductID"></tw>
    <submit-bar
      :price="total"
      @onSubmit="clickSubmit"
      button="确定赠送">
    </submit-bar>
    <popup v-model="isShowPassword">
      <password ref="pwd" @finishpwd="submitTransfer"></password>
    </popup>
    <protocol title="赠送协议" v-model="isShowPro" @agree="clickAgree">
      <p>XXX: 协议内容</p>
    </protocol>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ProductCount: 1,
      ToUserPhone: '',
      isShowPassword: false,
      isShowPro: false
    }
  },
  watch: {
    ProductCount(newValue, old) {
      this.ProductCount = Math.floor(newValue)
    }
  },
  computed: {
    total() {
      return this.transferGoods.ProductCost * this.ProductCount
    },
    transferGoods() {
      return this.$store.state.transferGoods
    }
  },
  methods: {
    clickAgree() {
      this.isShowPro = false
      this.isShowPassword = true
    },
    clickSubmit() {
      if (localStorage.getItem('protocol_give')) {
        this.isShowPassword = true
      } else {
        localStorage.setItem('protocol_give', 1)
        this.isShowPro = true
      }
    },
    async submitTransfer(pwd) {
      let {data} = await this.$http.post('User/GiveUserProduct', {
        ToUserPhone: this.ToUserPhone,
        UserProductID: this.transferGoods.ID,
        ProductCount: this.ProductCount,
        SellPassword: pwd
      })
      if (data.Code == 1) {
        this.isShowPassword = false
        this.$router.back()
      } else {
        this.$vux.toast.text(data.Message)
        this.$refs.pwd.clearPwd()
      }
    }
  }
}
</script>
