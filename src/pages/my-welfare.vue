<template>
  <div>
    <div class="wave-top">
      <d-header :tran="true">
        我的福利
      </d-header>
      <div class="wave-top-tran flex flex-center space-between">
        <div>
          <div class="fz25">{{Number(UserTotal.DividendCount) + Number(UserTotal.DividendProductCost) | decimal}}</div>
          <div class="gray">累计收益(元)</div>
        </div>
        <!-- <div>
          <div class="fz25">{{UserInfo.ShareCount}}</div>
          <div class="gray">持有W(个)</div>
        </div>
        <div>
          <span class="btn-inline" @click="$router.push('welfare-record')">W明细</span>
        </div> -->
      </div>
    </div>
    <div class="goods-list">
      <list
        action-name="getWelfare"
        :dataLength="dataList.length"
        :height="`-${228}`"
      >
        <div
          v-for="item in dataList"
          :key="item.ID"
          class="bb flex flex-center list-item"
          :class="item.Type == 1 ? 'record-money' : 'record-goods'"
          @click="goDetail(item)">
          <div class="flex-1">
            <div class="round-text"></div>
          </div>
          <div class="flex-5">
            <div class="flex space-between fz16">
              <div>{{item.ProductName}}</div>
              <div class="main-color">
                +{{item.DividendCount}}<span v-show="item.Type != 1">份{{item.DividendProductName}}</span>
              </div>
            </div>
            <div class="flex space-between">
              <div class="gray" v-if="item.Type == 3">总金额：{{item.Amount}}</div>
              <div class="gray" v-else>T(个)：{{item.OrderShareCount}}</div>
              <div class="gray">{{item.CreateTime}}</div>
            </div>
          </div>
        </div>
      </list>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    dataList() {
      return this.$store.state.Welfare
    },
    UserInfo() {
      return this.$store.state.UserInfo
    },
    UserTotal() {
      return this.$store.state.UserTotal
    }
  },
  methods: {
    goDetail(item) {
      this.$store.commit('setRecordDetail', item)
      this.$router.push('welfare-detail')
    }
  }
}
</script>

<style scoped>
.goods-list{
  padding: 0 12px;
}
.list-item{
  background: #fff;
  padding: 18px 14px;
  margin-bottom: 15px;
  border-radius: 5px;
}
</style>
