<template>
  <div>
    <x-header>消费明细</x-header>
    <tab v-model="tabIndex" prevent-default @on-before-index-change="switchTabItem">
      <tab-item selected>全部</tab-item>
      <tab-item>入住</tab-item>
    </tab>
    <div class="list">
      <div class="list-item" @click="goDetail">
        <div class="list-padding">
          <div class="flex space-between">
            <div class="flex-1">订单号：123456</div>
            <div class="btn-color color-success">已入住</div>
          </div>
          <div class="flex">
            <div class="gray">入住花费</div>
          </div>
          <div class="flex">
            <div>10000个商品A</div>
            <div class="gray flex-2 text-right">2018-04-20</div>
          </div>
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
    },
    switchTabItem (index) {
      console.log('on-before-index-change', index)
      this.$vux.loading.show({
        text: '加载中'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
        this.tabIndex = index
      }, 500)
    }
  }
}
</script>
