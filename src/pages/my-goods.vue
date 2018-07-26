<template>
  <div>
    <div class="wave-top">
      <d-header :tran="true">
        我的商品库
      </d-header>
      <div class="wave-top-tran flex flex-center space-between">
        <div>
          <div class="fz25">{{goodsNumber}}</div>
          <div class="gray">
            总商品数(个)
            <span class="fz12 btn-outline" @click="$router.push({name: 'GoodsRecord'})">明细</span>
          </div>
        </div>
        <div>
          <span class="btn-inline" @click="$router.push('trans-list')">转让</span>
        </div>
      </div>
    </div>
    <div class="goods-list">
      <list
        action-name="getUserProduct"
        :dataLength="dataList.length"
        :height="`-${228}`"
      >
        <div>
          <div class="list-item" v-for="(item, i) in dataList" :key="i" @click="showTransfer(item)">
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
  },
  methods: {
    showTransfer(item) {
      this.$store.commit('setTransferGoods', item)
      this.$vux.confirm.show({
        hideOnBlur: true,
        content: '转让或赠送',
        cancelText: '赠送',
        confirmText: '转让',
        onCancel: () => {
          this.$router.push('give-other')
        },
        onConfirm: () => {
          this.$router.push('transfer')
        }
      })
    }
  }
}
</script>

<style scoped>
.goods-list{
  padding: 0 12px;
}
.list-item{
  background: #fff;
  padding: 5px 34px;
  margin-bottom: 15px;
  border-radius: 5px;
}
</style>
