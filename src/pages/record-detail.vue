<template>
  <div :class="detailData.Type | isIncome">
    <d-header :tran="true" :theme-color="true">消费明细详情</d-header>
    <div class="top center">
      <div>{{detailData.ProductName}}</div>
      <div class="cost-num fz25">{{detailData.ProductCount}}</div>
      <div class="theme-color">{{detailData.Type | typeName}}</div>
    </div>
    <group :gutter="-1">
      <cell title="订单类型：" :value="detailData.Type | typeName"></cell>
      <cell title="关联订单号：" :value="detailData.OrderNumber"></cell>
      <cell title="购买时间：" :value="detailData.CreateTime | DATEFORMAT"></cell>
    </group>
    <group title="摘要">
      <cell title="商品名称：" :value="detailData.ProductName"></cell>
      <cell title="商品总数(个)：">
        <div class="cost-num">{{detailData.ProductTCount}}</div>
      </cell>
      <cell title="途径：" :value="detailData.Type | typeName"></cell>
    </group>
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
      return this.$store.getters.getRecordDetail(this.id)
    }
  }
}
</script>

<style scoped>
.top{
  background: #fff;
  padding: 20px;
  position: relative;
  z-index: 1;
}
.fz25{
  font-size: 25px;
}
</style>
