<template>
  <div>
    <div class="top">
      <d-header :tran="true">
        我的商品库
      </d-header>
      <div class="top-tran flex flex-center space-between">
        <div>
          <div class="big">{{goodsNumber}}</div>
          <div class="gray">总商品数(个)</div>
        </div>
        <div>
          <span class="btn-inline" @click="$router.push({name: 'GoodsRecord'})">明细</span>
        </div>
      </div>
    </div>
    <div class="goods-list">
      <list
        action-name="getUserProduct"
        :dataLength="dataList.length"
        :height="`-${228}px`"
      >
        <div>
          <div class="list-item" v-for="(item, i) in dataList" :key="i">
            <div class="flex gray space-between fz15">
              <div>商品名称：</div>
              <div>可用(个)</div>
            </div>
            <div class="flex space-between flex-baseline">
              <div class="fz15">{{item.ProductName}}</div>
              <div class="theme-color fz20">{{item.ProductCount}}</div>
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
      return this.$store.state.UserProduct
    },
    goodsNumber() {
      return this.$store.state.goodsNumber
    }
  }
}
</script>

<style scoped>
.top{
  background: url('../assets/w-bg.png');
  background-size: 100% 90%;
  background-repeat: no-repeat;
}
.top-tran{
  height: 150px;
  background: rgba(255, 255, 255, .8);
  margin: 12px;
  box-shadow: 0 5px 15px #dcdcdc;
  border-radius: 5px;
  padding: 30px;
  box-sizing: border-box;
}
.goods-list{
  padding: 0 12px;
}
.list-item{
  background: #fff;
  padding: 5px 34px;
  margin-bottom: 15px;
  border-radius: 5px;
}
.fz12{
  font-size: 12px;
}
.big{
  font-size: 25px;
}
</style>
