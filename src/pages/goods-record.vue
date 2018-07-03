<template>
  <div>
    <d-header :tran="true" :theme-color="true">商品明细</d-header>
    <list
      action-name="getProductStream"
      :dataLength="dataList.length"
      :height="`-67`"
    >
      <div class="list">
        <div
          v-for="item in dataList"
          :key="item.ID"
          class="fff-bg bb flex cell flex-center"
          :class="item.Type | isIncome"
          @click="goDetail(item.ID)">
          <div class="flex-1">
            <div class="round-text"></div>
          </div>
          <div class="flex-5">
            <div class="flex space-between fz16">
              <div>{{item.ProductName}}</div>
              <div class="cost-color cost-num">{{item.ProductCount}}</div>
            </div>
            <div class="flex space-between">
              <div class="gray">{{item.Type | typeName}}</div>
              <div class="gray">{{item.CreateTime | DATEFORMAT}}</div>
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
      return this.$store.state.ProductStream
    }
  },
  methods: {
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
