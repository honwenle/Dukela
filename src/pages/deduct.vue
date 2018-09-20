<template>
  <div>
    <div class="pop-header bb">
      <span @click="$emit('selectDeduct')">取消</span>
    </div>
    <list
      action-name="getUserProduct"
      :dataLength="goodsList.length"
      :height="`${-67 - 50}`">
      <checker v-model="deductInfo"
        radio-required
        default-item-class="checker-item"
        selected-item-class="checker-on"
        @on-change="setDeduct">
        <checker-item v-for="item in goodsList" :key="item.ID" :value="item">
          <div class="flex flex-center checker-box">
            <div class="flex-1" style="line-height: 1.8;">
              <div class="fz15">{{item.ProductName}}</div>
            </div>
            <div class="flex-2 col2">
              <div class="gray">
                可抵扣商品数：<span class="theme-color">{{item.ProductCount}}</span>
              </div>
              <div class="gray">
                可抵扣T数：<span class="theme-color">{{item.TAmount}}</span>
              </div>
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
export default {
  data() {
    return {
      deductInfo: {}
    }
  },
  computed: {
    roomData() {
      return this.$store.state.RoomDetail
    },
    TRate() {
      return this.$store.state.Config.TProportion
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
      this.deductInfo = {}
      this.$store.commit('clearDeduct')
      this.$emit('selectDeduct')
    },
    setDeduct(val) {
      this.$store.commit('setDeduct', val)
      this.$emit('selectDeduct')
    }
  }
}
</script>
<style scoped>
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
