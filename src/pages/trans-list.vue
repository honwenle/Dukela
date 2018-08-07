<template>
  <div>
    <d-header :tran="true" :theme-color="true">转让/赠送</d-header>
    <list
      action-name="getUserProduct"
      :dataLength="goodsList.length"
      :paramsData="{
        IsZR: 1
      }"
      :height="`${-67 - 50}`">
      <checker v-model="goodsInfo"
        radio-required
        default-item-class="checker-item"
        selected-item-class="checker-on"
        @on-change="setTransferGoods">
        <checker-item v-for="item in goodsList" :key="item.ID" :value="item">
          <div class="flex flex-center checker-box bb">
            <div class="flex-5">
              <div class="trans-item-title">{{item.ProductName}}</div>
              <div class="flex">
                <div style="padding-right: 10px">
                  <div class="gray">可用(个)</div>
                  <div>{{item.ProductCount}}</div>
                </div>
                <div style="padding-right: 10px">
                  <div class="gray">可转让(个)</div>
                  <div>{{item.TransferCount}}</div>
                </div>
                <div>
                  <div class="gray">指导价格(元/个)</div>
                  <div>{{item.GuidanceCost}}</div>
                </div>
              </div>
            </div>
            <font-icon fontsize="22px" :name="item.ID == goodsInfo.ID ? 'radio' : 'radio1'"></font-icon>
          </div>
        </checker-item>
      </checker>
    </list>
    <div class="flex trans-bottom">
      <div @click="goTrans(0)" class="flex-1 fff-bg">赠送</div>
      <div @click="goTrans(1)" class="flex-1 theme-bg white">转让</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodsInfo: {}
    }
  },
  computed: {
    goodsList() {
      return this.$store.state.UserProduct
    },
    transferGoods() {
      return this.$store.state.transferGoods
    }
  },
  methods: {
    setTransferGoods(item) {
      this.$store.commit('setTransferGoods', item)
    },
    goTrans(type) {
      if (!this.goodsInfo.ID) {
        this.$vux.toast.text('请先选择商品')
        return false
      }
      if (type == 1 && this.transferGoods.TransferCount <= 0) {
        this.$vux.toast.text('可转让商品数为0')
        return false
      }
      this.$router.push(['give-other', 'transfer'][type])
    }
  }
}
</script>
<style scoped>
.trans-item-title{
  font-size: 16px;
  padding: 5px 0;
}
.trans-bottom{
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
</style>
