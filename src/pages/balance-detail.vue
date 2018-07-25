<template>
  <div>
    <d-header :tran="true" :theme-color="true">收支详情</d-header>
    <group gutter="0" :class="balanceDetail.AType == 1 ? 'record-income' : 'record-outcome'">
      <cell title="收入">
        <div class="cost-color cost-num">{{balanceDetail.Amount}}</div>
      </cell>
      <cell title="订单类型" :value="balanceDetail.SourceType | balanceTypeName"></cell>
      <cell title="时间" :value="balanceDetail.UpdateTime"></cell>
      <cell title="余额(元)" :value="balanceDetail.AccountBalance"></cell>
      <cell title="状态" value="已完成"></cell>
    </group>
  </div>
</template>
<script>
export default {
  computed: {
    balanceDetail() {
      return this.$store.state.balanceDetail
    }
  }
}
</script>
