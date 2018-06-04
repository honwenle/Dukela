<template>
  <div>
    <d-header>商品抵扣</d-header>
    <list
      action-name="getUserProduct"
      :dataLength="goodsList.length"
      :height="`-${67}px`">
      <checker v-model="deductId"
        default-item-class="checker-item"
        selected-item-class="checker-on"
        @on-change="setDeduct">
        <checker-item v-for="item in goodsList" :key="item.ID" :value="item.ID">
          {{item.ProductName}}
          <font-icon :name="item.ID == deductId ? 'radio' : 'radio1'"></font-icon>
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
      deductId: ''
    }
  },
  computed: {
    goodsList() {
      return this.$store.state.UserProduct
    }
  },
  methods: {
    setDeduct(val) {
      this.$store.commit('setDeductId', val)
    }
  }
}
</script>
<style scoped>
.checker-item{
  display: block;
}
</style>
