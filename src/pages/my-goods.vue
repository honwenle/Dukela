<template>
  <div class="bg-fff">
    <div class="top">
      <d-header :tran="true">
        我的商品库
      </d-header>
      <div style="padding: 22px">
        <div class="fz25">400</div>
        <span class="fz12">总商品数(个)</span>
        <div class="float-right">
          <div class="btn-reverse" @click="$router.push({name: 'GoodsRecord'})">明细</div>
        </div>
      </div>
    </div>
    <div class="goods-list" v-if="dataList.length > 0">
      <div class="list-item" v-for="(item, i) in dataList" :key="i">
        <div class="item-row">
          <div class="item-t1">{{item.ProductName}}</div>
        </div>
        <div class="item-row">
          <div class="item-t3">
            <div class="item-t2">持有(份)</div>{{item.ProductCount}}
            <!-- <div class="float-right fz12">可转让：420份</div> -->
          </div>
        </div>
        <!-- <div class="item-progress">
          <div class="item-progress-line" :style="`width:${100*item.TAmount/item.ProductCount}%`"></div>
        </div> -->
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
      data = {Code: 1, List: [ // TODO: ~TEST~
        {
          ProductName: '山庄1项目30㎡',
          ProductCount: '500',
          TAmount: '420',
        },
        {
          ProductName: '山庄1项目30㎡',
          ProductCount: '500',
          TAmount: '420',
        },
        {
          ProductName: '山庄1项目30㎡',
          ProductCount: '500',
          TAmount: '420',
        }
      ]}
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
.item-row{
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
.fz25{
  font-size: 25px;
}
.top{
  background: #699eff;
  color: #fff;
}
.btn-reverse {
  background: #fff;
  color: #369cfe;
  font-size: 12px;
  padding: 3px 15px;
  border-radius: 3px;
}
.item-progress{
  height: 3px;
  background: #eee;
  border-radius: 6px;
}
.item-progress-line{
  border-radius: 6px;
  height: 3px;
  width: 0%;
  background: #369CFE;
}
</style>
