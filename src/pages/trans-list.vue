<template>
  <div>
    <d-header :tran="true" :theme-color="true">转让/赠送</d-header>
    <list
      action-name="getUserProduct"
      :dataLength="goodsList.length"
      :height="`${-67 - 50}`">
      <checker v-model="goodsInfo"
        radio-required
        default-item-class="checker-item"
        selected-item-class="checker-on"
        @on-change="setTransferGoods">
        <checker-item v-for="item in goodsList" :key="item.ID" :value="item">
          <div class="flex flex-center checker-box">
            <div class="flex-1" style="line-height: 1.8;">
              <div class="fz15">{{item.ProductName}}</div>
              <div class="gray">商品数：{{item.ProductCount}}</div>
            </div>
            <div class="flex-2 col2">
              <div class="price">{{item.ID}}</div>
              <div class="gray">抵扣价格</div>
            </div>
            <font-icon fontsize="22px" :name="item.ID == goodsInfo.ID ? 'radio' : 'radio1'"></font-icon>
          </div>
        </checker-item>
      </checker>
    </list>
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
    }
  },
  methods: {
    setTransferGoods(item) {
      this.$store.commit('setTransferGoods', item)
    }
  }
}
</script>
