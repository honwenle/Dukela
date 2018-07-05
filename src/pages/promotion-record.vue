<template>
  <div>
    <d-header :tran="true" :theme-color="true">收益明细</d-header>
    <list
      action-name="getAchievementList"
      :dataLength="dataList.length"
      :height="`-67`"
    >
      <div class="list">
        <div
          v-for="item in dataList"
          :key="item.ID"
          v-show="item.Type == 0"
          class="fff-bg bb flex cell flex-center record-income">
          <div class="flex-1">
            <div class="round-text"></div>
          </div>
          <div class="flex-5">
            <div class="flex space-between fz16">
              <div>订单号：{{item.OrderNumber}}</div>
              <div class="cost-color cost-num">{{item.Amount}}</div>
            </div>
            <div class="flex space-between">
              <div class="gray">交易金额：{{item.OrderAmount}}</div>
              <div class="gray">{{item.CreateTime}}</div>
            </div>
          </div>
        </div>
      </div>
    </list>
  </div>
</template>
<script>
export default {
  computed: {
    dataList() {
      return this.$store.state.AchievementList
    }
  }
}
</script>
