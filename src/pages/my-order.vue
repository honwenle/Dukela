<template>
  <div class="win-wrap">
    <x-header>我的订单</x-header>
    <tab v-model="tabIndex" prevent-default @on-before-index-change="switchTabItem">
      <tab-item selected>买入订单</tab-item>
      <tab-item>预定订单</tab-item>
    </tab>
    <div class="list" v-if="dataList.length > 0">
      <div class="list-item" v-for="(item, i) in dataList" :key="i">
        <div class="list-padding">
          <div class="flex space-between">
            <div class="flex-1">{{item.ProductName}}</div>
            <div class="btn-color color-success">买入成功</div>
          </div>
          <div class="flex">
            <div class="gray flex-1">买入</div>
            <div class="gray flex-1">购入T值(元/份)</div>
            <div class="flex-2"></div>
          </div>
          <div class="flex">
            <div class="flex-1">{{item.Amount}}</div>
            <div class="flex-1">{{item.TAmount}}</div>
            <div class="gray flex-2 text-right">{{formatDate(item.PayDate)}}</div>
          </div>
        </div>
        <div class="list-padding2">
          <div class="gray">订单号：{{item.OrderNumber}}</div>
        </div>
      </div>
      <div class="btn-main" @click="loadMore">加载更多</div>
    </div>
    <div class="goods-empty" v-else>
      <img src="../assets/icon-empty.png" alt="">
      <div>暂无订单</div>
    </div>
  </div>
</template>
<script>
import { dateFormat, Tab, TabItem } from 'vux'
export default {
  components: {Tab, TabItem},
  data() {
    return {
      dataList: [],
      pageIndex: 1,
      tabIndex: 0
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    formatDate(d) {
      return dateFormat(new Date(parseInt(d.match((/\d{13}/)))), 'YYYY-MM-DD HH:mm:ss')
    },
    loadMore() {
      this.pageIndex ++
      this.getList()
    },
    async getList() {
      let {data} = await this.$http({
        method: 'post',
        url: '/ProductOrderIn/GetModelList',
        data: {
          pageSize: 10,
          pageIndex: this.pageIndex,
          orderby: ''
        }
      })
      data = {Code: 1, List: [
        {
          ProductName: '山庄xxx',
          Amount: '500',
          TAmount: '0.8',
          PayDate: 'DDD1526350801000',
          OrderNumber: '23432325'
        }
      ]}
      if (data.Code == 1) {
        if (data.List.length == 0) {
          this.$vux.toast.text('已无更多')
        }
        this.dataList = this.dataList.concat(data.List)
      }
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
