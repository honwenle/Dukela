<template>
  <div class="win-wrap">
    <div class="goods-list" v-if="dataList.length > 0">
      <div class="list-item" v-for="(item, i) in dataList" :key="i">
        <div class="item-row">
          <div class="item-t1">{{item.ProductName}}</div>
        </div>
        <div class="item-row">
          <div class="item-t3"><div class="item-t2">可用(个)</div>{{item.ProductCount}}</div>
          <div class="item-t1"><div class="item-t2">T(个)</div>{{item.TAmount}}</div>
        </div>
      </div>
      <div class="btn-main" @click="loadMore">加载更多</div>
    </div>
    <div class="goods-empty" v-else>
      <img src="../assets/icon-empty.png" alt="">
      <div>暂无商品</div>
    </div>
  </div>
</template>
<script>
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
    loadMore() {
      this.pageIndex ++
      this.getList()
    },
    async getList() {
      let {data} = await this.$http({
        method: 'post',
        url: '/UserProduct/GetModelList',
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
.goods-list {
  background: #fff;
  padding: 1px 0;
}
.item-row{
  display: flex;
  line-height: 2.2;
}
.item-row > div {
  margin: 0 10px;
}
.list-item{
  margin: 15px;
  padding: 7px;
  box-shadow: 0 2px 6px #B8DCFF;
  border-radius: 10px;
}
.item-t2{
  font-size: 14px;
  color: #bbb;
}
.item-t3{
  color: #369CFE;
}
</style>
