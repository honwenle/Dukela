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
          :class="item.Type | isIncome"
          @click="goDetail(item.ID)">
          <div class="flex-1">
            <div class="round-text"></div>
          </div>
          <div class="flex-2">
            <div>{{item.ProductName}}</div>
            <div class="gray">{{item.Type | typeName}}</div>
          </div>
          <div class="flex-3 text-right">
            <div class="cost-color cost-num">{{item.ProductCount}}</div>
            <div class="gray">{{item.CreateTime | DATEFORMAT}}</div>
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
      return this.$store.state.ProductStream
    }
  },
  methods: {
    isIncome(type) {
      return type < 3
    },
    goDetail(id) {
      this.$router.push({
        path: 'record-detail',
        query: {
          id: id
        }
      })
    }
  }
}
</script>
