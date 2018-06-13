<template>
  <div>
    <div class="pop-header bb">
      <span @click="$emit('selectDeduct')">取消</span>
    </div>
    <list
      action-name="getUserProduct"
      :dataLength="goodsList.length"
      :paramsData="{bid: VillaData.ID}"
      :height="`-${67 - 50}px`">
      <checker v-model="deductInfo"
        default-item-class="checker-item"
        selected-item-class="checker-on"
        @on-change="setDeduct">
        <checker-item v-for="item in goodsList" :key="item.ID" :value="item">
          <div class="flex flex-center check-box">
            <div class="flex-1" style="line-height: 1.8;">
              <div class="fz15">{{item.ProductName}}</div>
              <div class="gray">商品数：{{item.ProductCount}}</div>
            </div>
            <div class="flex-2 col2">
              <div class="price">{{item.TAmount * TRate | decimal}}</div>
              <div class="gray">抵扣价格</div>
            </div>
            <font-icon fontsize="22px" :name="item.ID == deductInfo.ID ? 'radio' : 'radio1'"></font-icon>
          </div>
        </checker-item>
      </checker>
    </list>
    <div class="center main-bg nouse" @click="clearDeduct">不使用商品抵扣</div>
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
    clearDeduct() {
      this.$store.commit('clearDeduct')
      this.$emit('selectDeduct')
    },
    setDeduct(val) {
      this.$store.commit('setDeduct', {
        id: val.ProductID,
        name: val.ProductName,
        price: val.TAmount * this.TRate / val.ProductCount,
        size: val.ProductSize,
        amount: val.TAmount * this.TRate,
        count: val.ProductCount
      })
      this.$emit('selectDeduct')
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
.nouse{
  height: 50px;
  line-height: 50px;
  position: fixed;
  bottom: 0;
  width: 100%;
  color: #fff;
}
.pop-header{
  height: 44px;
  line-height: 44px;
  padding: 20px 15px 0;
  background: #fff;
}
</style>
