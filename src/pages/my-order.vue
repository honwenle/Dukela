<template>
  <div class="win-wrap">
    <d-header :tran="true" :theme-color="true">我的订单</d-header>
    <tab v-model="tabIndex" prevent-default @on-before-index-change="switchTabItem">
      <tab-item selected>买入订单</tab-item>
      <tab-item>预定订单</tab-item>
    </tab>
    <list
      action-name="getUserOrderList"
      :paramsData="{type: tabIndex}"
      :dataLength="dataList.length"
      :height="`-${67 + 44}px`"
      v-show="tabIndex == 0"
    >
      <div class="list">
        <div class="list-item" v-for="(item, i) in dataList" :key="i">
          <div class="list-padding" @click="goDetail(item.ID)">
            <div class="flex space-between">
              <div class="flex-1">{{item.ProductName}}</div>
              <div class="btn-color" :class="item.OrderStatus | tagColor">{{item.OrderStatus | orderStatusName}}</div>
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
          <div class="list-padding2 flex space-between flex-center">
            <div class="gray">{{item.CreateTime}}</div>
            <div class="btn-inline" @click="goPay(item.ID)" v-if="item.OrderStatus == 0">去支付</div>
          </div>
        </div>
      </div>
    </list>
    <list
      action-name="getUserOrderList"
      :paramsData="{type: tabIndex}"
      :dataLength="dataList.length"
      :height="`-${67 + 50}px`"
      v-show="tabIndex == 1"
    >
      <div class="list">
        <div class="list-item" v-for="(item, i) in dataList" :key="i">
          <div class="list-padding" @click="goDetail(item.ID)">
            <div class="flex space-between">
              <div>{{item.BeadhouseName}}</div>
              <div class="btn-color" :class="item.OrderStatus | tagColor">{{item.OrderStatus | reserveStatusName}}</div>
            </div>
            <div class="flex bg-eee m10">
              <div class="flex-1">
                <img v-if="item.BigPicUrl" class="img" :src="$imgUrl + item.BigPicUrl">
              </div>
              <div class="flex-5">
                <div class="gray">1间 {{item.TypeName}}</div>
                <div class="gray">{{item.ReserveStartTime}} 至 {{item.ReserveEndTime}}</div>
              </div>
            </div>
            <div class="theme-color text-right">总价：{{item.Amount}}元 需支付：{{item.PayAmount}}元</div>
          </div>
          <div v-if="item.OrderStatus == 0" class="list-padding2 text-right">
            <div class="btn-inline" @click="goPay(item.ID)">去付款</div>
          </div>
        </div>
      </div>
    </list>
  </div>
</template>
<script>
import { Tab, TabItem } from 'vux'
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
        path: ['detail', 'detail-reserve'][this.tabIndex],
        query: {
          id
        }
      })
    },
    goPay(id) {
      this.$router.push({
        name: 'Pay',
        query: {
          id,
          type: this.tabIndex
        }
      })
    },
    switchTabItem (index) {
      this.tabIndex = index
      this.$store.dispatch('getUserOrderList', {
        page: 1,
        type: index
      })
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
.m10{
  margin: 10px 0;
}
</style>
