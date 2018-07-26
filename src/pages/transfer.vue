<template>
  <div>
    <d-header :tran="true" :theme-color="true">转让</d-header>
    <group gutter="0">
      <cell title="XXXX" inline-desc="xxxxx"></cell>
    </group>
    <group label-width="100px">
      <x-number title="数量" align="left" v-model="ProductCount" :min="0"></x-number>
      <x-input title="赠送人账户" placeholder="请填写" v-model="ToUserPhone"></x-input>
    </group>
    <group label-width="100px">
      <cell title="W(个)" value-align="left" :value="0"></cell>
      <cell title="T(个)" value-align="left" :value="0"></cell>
    </group>
    <submit-bar
      :price="0"
      @onSubmit="isShowPassword = true"
      button="确定赠送">
    </submit-bar>
    <popup v-model="isShowPassword">
      <password ref="pwd" @finishpwd="submitTransfer"></password>
    </popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ProductCount: 0,
      ToUserPhone: '',
      id: this.$route.query.id,
      isShowPassword: false
    }
  },
  methods: {
    async submitTransfer(pwd) {
      let {data} = await this.$http.post('User/GiveUserProduct', {
        ToUserPhone: this.ToUserPhone,
        UserProductID: this.id,
        ProductCount: this.ProductCount,
        SellPassword: pwd
      })
      if (data.Code == 1) {
        console.log('ok')
      } else {
        this.$vux.toast.text(data.Message)
        this.$refs.pwd.clearPwd()
      }
    }
  }
}
</script>
