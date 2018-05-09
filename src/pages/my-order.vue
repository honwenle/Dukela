<template>
  <div class="win-wrap">
    <x-header>我的订单</x-header>
    <div class="list" v-if="dataList.length > 0">
      <div class="item" v-for="(item, i) in dataList" :key="i">
        <div class="row">
          {{item.ProductName}}
          <div class="btn-tip">买入成功</div>
        </div>
        <div class="row flex">
          <div class="b1">
            <div class="gray">买入</div>{{item.Amount}}
          </div>
          <div class="b1">
            <div class="gray">购入T值(元/份)</div>{{item.TAmount}}
          </div>
          <div class="date gray">{{formatDate(item.PayDate)}}</div>
        </div>
        <div class="br"></div>
        <div class="row">
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
import { dateFormat } from 'vux'
export default {
  data() {
    return {
      dataList: [],
      pageIndex: 1
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
      if (data.Code == 1) {
        if (data.List.length == 0) {
          this.$vux.toast.text('已无更多')
        }
        this.dataList = this.dataList.concat(data.List)
      }
    }
  }
}
</script>

<style scoped>
.list {
    font-size: 14px;
}
.item {
    margin-bottom: 10px;
    background: #fff;
    padding: 10px 0;
}
.row {
    position: relative;
    margin: 0 20px;
}
.btn-tip {
    position: absolute;
    right: 0;
    top: 0;
    background: #E6F8DC;
    color: #9EB68F;
    padding: .1em 1em;
}
.gray{
  color: #AAA;
}
.b1 {
    width: 25%;
    white-space: nowrap;
}
.date {
    position: absolute;
    right: 0;
    bottom: 0;
}
.br {
    height: 1px;
    background: #eee;
    margin: 10px 0;
}
</style>
