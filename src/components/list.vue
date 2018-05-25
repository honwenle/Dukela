<template>
  <div>
    <scroller
      ref="vuxscroller"
      lock-x
      use-pulldown
      @on-pulldown-loading="refreshData"
      @on-scroll-bottom="moreData"
      :height="height"
      :pulldown-config="{downContent: '下拉刷新', upContent: '释放后更新', loadingContent: '加载中'}">
      <slot></slot>
      <load-more :show-loading="onFetching" :tip="noMore ? '暂无数据' : '正在加载'"></load-more>
    </scroller>
  </div>
</template>
<script>
import { LoadMore } from 'vux'
export default {
  components: {
    LoadMore
  },
  data() {
    return {
      page: 1,
      noMore: false,
      onFetching: false
    }
  },
  props: {
    actionName: [String],
    dataLength: [Number],
    height: [String]
  },
  mounted() {
    this.loadData()
  },
  methods: {
    refreshData() {
      this.page = 1
      this.noMore = false
      this.loadData()
    },
    moreData() {
      if (this.onFetching || this.noMore) return false
      this.page ++
      this.loadData()
    },
    async loadData() {
      this.onFetching = true
      let count = await this.$store.dispatch(this.actionName, this.page)
      this.$refs.vuxscroller.donePulldown()
      this.$nextTick(() => {
        this.$refs.vuxscroller.reset()
      })
      this.onFetching = false
      this.noMore = (count == this.dataLength)
    }
  }
}
</script>
