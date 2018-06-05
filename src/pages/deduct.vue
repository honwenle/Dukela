<template>
  <div>
    <d-header>商品抵扣</d-header>
    <list
      action-name="getUserProduct"
      :dataLength="goodsList.length"
      :paramsData="{bid: VillaData.ID}"
      :height="`-${67}px`">
      <checker v-model="deductInfo"
        default-item-class="checker-item"
        selected-item-class="checker-on"
        @on-change="setDeduct">
        <checker-item v-for="item in goodsList" :key="item.ID" :value="item">
          <div class="flex flex-center check-box">
            <div class="flex-1">
              <div>{{item.ProductName}}</div>
              <div>商品数：{{item.ProductCount}}</div>
            </div>
            <div class="flex-2 col2">
              <div class="price">{{item.TAmount * TRate}}</div>
              <div class="gray">抵扣价格</div>
            </div>
            <font-icon fontsize="22px" :name="item.ID == deductInfo.ID ? 'radio' : 'radio1'"></font-icon>
          </div>
        </checker-item>
      </checker>
    </list>
  </div>
</template>
<script>
import {Checker, CheckerItem} from 'vux'
export default {
  components: {
    Checker, CheckerItem
  },
  data() {
    return {
      deductInfo: {}
    }
  },
  computed: {
    TRate() {
      return this.$store.state.TRate
    },
    goodsList() {
      return this.$store.state.UserProduct
    },
    VillaData() {
      return this.$store.state.VillaDetail
    }
  },
  methods: {
    setDeduct(val) {
      this.$store.commit('setDeduct', {
        id: val.ProductID,
        price: val.TAmount * this.TRate / val.ProductCount,
        amount: val.TAmount * this.TRate,
        count: val.ProductCount
      })
      // TODO: 返回不刷新
      this.$router.back()
    }
  }
}
</script>
<style scoped lang="less">
.checker-item{
  display: block;
  padding: 12px 15px 0;
  .iconfont{
    color: #eee;
  }
}
.check-box{
  background: #fff;
  padding: 10px 15px;
  font-size: 14px;
}
.checker-on .iconfont{
  color: @theme-color;
}
.col2{
  border-left: 1px solid #eee;
  padding-left: 15px;
}
</style>
