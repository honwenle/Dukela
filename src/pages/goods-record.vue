<template>
  <div>
    <d-header>商品明细</d-header>
    <div class="list">
      <div class="list-item flex cell flex-center" @click="goDetail">
        <div class="flex-1">
          <div class="round-text round-orange">收</div>
        </div>
        <div class="flex-2">
          <div>商品A</div>
          <div class="gray">商品购买</div>
        </div>
        <div class="flex-3 text-right">
          <div class="orange">+1000</div>
          <div class="gray">2018-05-14 10:52:17</div>
        </div>
      </div>
      <div class="list-item flex cell flex-center" @click="goDetail">
        <div class="flex-1">
          <div class="round-text round-mint">支</div>
        </div>
        <div class="flex-2">
          <div>商品B</div>
          <div class="gray">入住消费</div>
        </div>
        <div class="flex-3 text-right">
          <div class="mint">-1000</div>
          <div class="gray">2018-05-14 10:52:17</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {Tab, TabItem} from 'vux'
export default {
  components: {Tab, TabItem},
  data() {
    return {
      tabIndex: 0
    }
  },
  methods: {
    goDetail() {
      this.$router.push({
        name: 'Detail'
      })
    }
  }
}
</script>
