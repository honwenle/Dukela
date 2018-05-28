<template>
  <div>
    <d-header :tran="true" :theme-color="true">商品明细</d-header>
    <list
      action-name="getProductStream"
      :dataLength="dataList.length"
      :height="`-67px`"
    >
      <div class="list">
        <div
          v-for="item in dataList"
          :key="item.ID"
          class="list-item flex cell flex-center"
          :class="isIncome ? 'record-income' : 'record-outcome'"
          @click="goDetail">
          <div class="flex-1">
            <div class="round-text"></div>
          </div>
          <div class="flex-2">
            <div>{{item.ProductName}}</div>
            <div class="gray">{{TYPE_LIST[item.Type]}}</div>
          </div>
          <div class="flex-3 text-right">
            <div class="cost-color">{{item.ProductCost}}</div>
            <div class="gray">2018-05-14 10:52:17</div>
          </div>
        </div>
      </div>
    </list>
  </div>
</template>
<script>
export default {
  data(){
    return {
      TYPE_LIST: ['无', '商品购买', '商品分红']
    }
  },
  computed: {
    dataList() {
      return this.$store.state.ProductStream
    }
  },
  methods: {
    isIncome(type) {
      return type < 3
    },
    goDetail() {
      this.$router.push({
        name: 'Detail'
      })
    }
  }
}
</script>
<style scoped lang="less">
.record-income {
  .round-text{
    background: @main-color;
  }
  .cost-color{
    color: @orange-color;
  }
  .cost-color::before{
    content: '+';
  }
  .round-text::before{
    content: '收';
  }
}
.record-outcome {
  .round-text{
    background: @mint-color;
  }
  .cost-color{
    color: @theme-color;
  }
  .cost-color::before{
    content: '-';
  }
  .round-text::before{
    content: '支';
  }
}
</style>
