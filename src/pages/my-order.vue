<template>
  <div class="win-wrap">
    <d-header>我的订单</d-header>
    <tab v-model="tabIndex" prevent-default @on-before-index-change="switchTabItem">
      <tab-item selected>买入订单</tab-item>
      <tab-item>预定订单</tab-item>
    </tab>
    <list
      action-name="getUserOrderList"
      :dataLength="dataList.length"
      :height="`-${67 + 44}px`"
      v-if="tabIndex == 0"
    >
      <div class="list">
        <div class="list-item" v-for="(item, i) in dataList" :key="i" @click="goDetail(item.ID)">
          <div class="list-padding">
            <div class="flex space-between">
              <div class="flex-1">{{item.ProductName}}</div>
              <div class="btn-color color-success">买入成功</div>
            </div>
            <div class="flex">
              <div class="gray flex-1">数量(个)</div>
              <div class="gray flex-1">单价(元)</div>
              <div class="gray flex-1">总金额(元)</div>
              <div class="flex-1"></div>
            </div>
            <div class="flex">
              <div class="flex-1">{{item.ProductCount}}</div>
              <div class="flex-1">{{item.ProductCost}}</div>
              <div class="flex-1 theme-color">{{item.Amount}}</div>
              <div class="flex-1"></div>
            </div>
          </div>
          <div class="list-padding2">
            <div class="gray">{{item.CreateTime}}</div>
          </div>
        </div>
      </div>
    </list>
    <list
      action-name="getVillaList"
      :dataLength="dataList.length"
      :height="`-${67 + 50}px`"
      v-else
    >
      <div class="list">
        <div class="list-item" v-for="(item, i) in dataList" :key="i">
          <div class="list-padding flex">
            <div class="flex-1">
              <img class="img" src="https://o5omsejde.qnssl.com/demo/test1.jpg?type=webp">
            </div>
            <div class="flex-5">
              <div class="flex space-between">
                <div>山庄1项目</div>
                <div class="btn-color color-error">待支付</div>
              </div>
              <div class="gray">1间 大床房</div>
              <div class="gray">2018-04-09 16：00 至 2018-04-10 15：59</div>
              <div class="gray">总价：1000元</div>
            </div>
          </div>
          <div class="list-padding2 text-right">
            <div class="btn-inline">去付款</div>
          </div>
        </div>
      </div>
    </list>
  </div>
</template>
<script>
// TODO: 订单状态
import { dateFormat, Tab, TabItem } from 'vux'
export default {
  components: {Tab, TabItem},
  data() {
    return {
      tabIndex: 0
    }
  },
  computed: {
    dataList() {
      return this.$store.state.UserOrderList
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        path: 'detail',
        query: {
          id
        }
      })
    },
    switchTabItem (index) {
      console.log('on-before-index-change', index)
      this.$vux.loading.show({
        text: '加载中'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
        this.tabIndex = index
      }, 500)
    }
  }
}
</script>
<style scoped>
.img{
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
</style>
