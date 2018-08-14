<template>
  <div :class="detailData.Type | isIncome">
    <d-header :tran="true" :theme-color="true">福利详情</d-header>
    <div class="top center">
      <div>{{detailData.ProductName}}</div>
      <div class="cost-num fz25">{{detailData.DividendCount}}</div>
    </div>
    <group :gutter="-1">
      <cell title="福利方式：" :value="detailData.Type | welfareTypeName"></cell>
      <cell title="流水号：" :value="detailData.DividendNo"></cell>
      <cell title="时间：" :value="detailData.CreateTime | DATEFORMAT"></cell>
    </group>
  </div>
</template>
<script>
export default {
  computed: {
    detailData() {
      return this.$store.state.RecordDetail
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
