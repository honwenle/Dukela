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
          @click="goDetail">
          <div class="flex-1">
            <div class="round-text round-orange">收</div>
          </div>
          <div class="flex-2">
            <div>{{item.ProductName}}</div>
            <div class="gray">商品购买</div>
          </div>
          <div class="flex-3 text-right">
            <div class="orange">+{{item.ProductCost}}</div>
            <div class="gray">2018-05-14 10:52:17</div>
          </div>
        </div>
        <div class="list-item flex cell flex-center" @click="goDetail">
          <div class="flex-1">
            <div class="round-text round-mint">支</div>
          </div>
          <div class="flex-2">
            <div>商品B</div>
            <div class="gray">入住消费</div>
          </div>
          <div class="flex-3 text-right">
            <div class="mint">-1000</div>
            <div class="gray">2018-05-14 10:52:17</div>
          </div>
        </div>
      </div>
    </list>
  </div>
</template>
<script>
// TODO: 区分不同type
export default {
  computed: {
    dataList() {
      return this.$store.state.ProductStream
    }
  },
  methods: {
    goDetail() {
      this.$router.push({
        name: 'Detail'
      })
    }
  }
}
</script>
