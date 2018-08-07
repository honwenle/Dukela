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
            <div class="fz16">{{item.ProductName}}</div>
            <div class="gray flex">
              <div class="w100">可用(个)</div>
              <div>T(个)</div>
            </div>
            <div class="flex flex-center">
              <div class="w100 theme-color fz20">{{item.ProductCount}}</div>
              <div class="fz16">{{item.TAmount}}</div>
            </div>
            <div class="progress">
              <div class="text-right theme-color" style="padding-bottom: 10px">可转让：{{item.TransferCount}}个</div>
              <x-progress :percent="100 * item.TransferCount / item.ProductCount" :show-cancel="false"></x-progress>
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
    },
    transferGoods() {
      return this.$store.state.transferGoods
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
          if (this.transferGoods.TransferCount <= 0) {
            this.$vux.toast.text('可转让商品数为0')
            return false
          }
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
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
}
.w100 {
  width: 100px;
}
.progress{
  padding-bottom: 10px;
  margin-top: -15px;
}
</style>
