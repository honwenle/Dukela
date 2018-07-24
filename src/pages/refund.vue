<template>
  <div>
    <d-header :tran="true" :theme-color="true">退货</d-header>
    <group gutter="0">
      <cell :title="detail.ProductName"></cell>
    </group>
    <group>
      <cell title="数量(个)" :value="detail.ProductCount"></cell>
      <cell title="价格(元)" :value="detail.ProductCost"></cell>
    </group>
    <group>
      <cell title="W(个)" :value="detail.ShareAmount"></cell>
      <cell title="T(个)" :value="detail.TAmount"></cell>
    </group>
    <group>
      <cell title="退款金额(元)" :value="detail.PayAmount"></cell>
    </group>
    <div class="btn-full theme-color" @click="clickSubmit">提交</div>
    <protocol title="退货协议" v-model="isShowPro" @agree="submitOrder">
      <p>XXX: 协议内容</p>
    </protocol>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.query.id,
      isShowPro: false
    }
  },
  computed: {
    detail() {
      return this.$store.state.OrderDetail
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$store.dispatch('getOrder', {
        id: this.id,
        type: 0
      })
    },
    clickSubmit() {
      if (localStorage.getItem('protocol_refund')) {
        this.submitOrder()
      } else {
        localStorage.setItem('protocol_refund', 1)
        this.isShowPro = true
      }
    },
    async submitOrder() {
      this.isShowPro = false
      let {data} = await this.$http.post('ProductOrderIn/ReturnOrder', {
        OrderID: this.id
      })
      if (data.Code == 1) {
        this.$router.back()
      } else {
        this.$vux.toast.text(data.Message)
      }
    }
  }
}
</script>
