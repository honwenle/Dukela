<template>
  <div class="bg-fff">
    <d-header :tran="true" :theme-color="true">消费明细</d-header>
    <div class="detail">
      <div class="detail-top">
        <div class="detail-title">您的商品已购入</div>
      </div>
      <div class="detail-box">
        <group class="box" :gutter="0">
          <cell title="商品总价(元)：">
            <div class="theme-color">{{detailData.Amount}}</div>
          </cell>
          <cell title="商品名称：" :value="detailData.ProductName"></cell>
          <cell title="商品总数(个)：" :value="detailData.ProductCount"></cell>
          <cell title="商品单价(元)：" :value="detailData.ProductCost"></cell>
        </group>
        <group class="box" :gutter="0">
          <cell title="支付方式：" :value="detailData.PayType"></cell>
          <cell title="支付流水号：" :value="detailData.xxx"></cell>
          <cell title="订单号：" :value="detailData.OrderNumber"></cell>
          <cell title="支付时间：" :value="detailData.PayDate | DATEFORMAT"></cell>
          <cell title="创建时间：" :value="detailData.CreateTime | DATEFORMAT"></cell>
        </group>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.query.id
    }
  },
  computed: {
    detailData() {
      return this.$store.getters.getOrderDetail(this.id)
    }
  }
}
</script>
