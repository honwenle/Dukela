<template>
  <div>
    <d-header>商品抵扣</d-header>
    <list
      action-name="getUserProduct"
      :dataLength="goodsList.length"
      :height="`-${67}px`">
      <checker type="checkbox" v-model="deductList" default-item-class="checker-item" selected-item-class="checker-on">
        <checker-item v-for="item in goodsList" :key="item.ID" :value="item.ID">
          {{item.ProductName}}
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
      deductList: []
    }
  },
  computed: {
    goodsList() {
      return this.$store.state.UserProduct
    }
  }
}
</script>
<style scoped>
.checker-item{
  display: block;
}
.checker-on{
  color: #f00;
}
</style>
