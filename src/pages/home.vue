<template>
  <div class="fixed-bottom">
    <x-header :left-options="{showBack: false}">
      都可拉
      <router-link v-if="!UserKey" slot="right" to="login" style="color: #60b63c">登录/注册</router-link>
    </x-header>
    <div class="top">
      <img src="../assets/banenr.png" alt="">
    </div>
    <div class="list">
      <scroller
        ref="vuxscroller"
        lock-x
        use-pulldown
        @on-pulldown-loading="refreshData"
        @on-scroll-bottom="moreData"
        height="-277px"
        :pulldown-config="{downContent: '下拉刷新', upContent: '释放后更新', loadingContent: '加载中'}">
        <div style="padding: 0 16px;">
          <div class="home-item" v-for="(item, i) in dataList" :key="i">
            <div class="bb" style="padding: 6px 15px">
              <font-icon name="home1" color="#6e9cff"></font-icon>
              {{item.ProductName}}
            </div>
            <div class="flex flex-center" style="padding: 10px 0 7px 15px">
              <div class="flex-1">
                <div class="gray">价格（元/小时）</div>
                <div class="big-num">{{item.ProductCost}}</div>
              </div>
              <div class="flex-1 border-left">
                <div class="gray"><font-icon name="rmb"></font-icon>已出售<span class="theme-color">{{item.ProductUsedCount}}小时</span></div>
                <div class="gray"><font-icon name="kucun"></font-icon>剩余{{item.ProductLessCount}}小时</div>
              </div>
              <div class="flex-1 center">
                <div class="btn-outline orange" @click="goGoods(item.ID)">立即抢购</div>
              </div>
            </div>
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>
<script>
import { Scroller } from 'vux'
export default {
  components: {
    Scroller
  },
  data() {
    return {
      page: 1,
      noMore: false
    }
  },
  computed: {
    dataList() {
      return this.$store.state.homeList
    },
    UserKey() {
      return this.$store.state.UserKey
    }
  },
  mounted() {
    this.$store.dispatch('getHomeList')
    this.$nextTick(() => {
      this.$refs.vuxscroller.reset()
    })
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
      let count = await this.$store.dispatch('getHomeList', this.page)
      this.$refs.vuxscroller.donePulldown()
      this.$nextTick(() => {
        this.$refs.vuxscroller.reset()
      })
      this.onFetching = false
      this.noMore = (count == this.dataList.length)
    },
    goGoods(id) {
      this.$router.push({
        name: 'Goods',
        query: {
          id: id
        }
      })
    }
  }
}
</script>
<style scoped>
.list{
  top: calc(180px + 47px);
  height: calc(100vh - 180px - 47px);
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  overflow: hidden;
}
.top{
  height: 180px;
}
.top img{
  width: 100%;
  height: 100%;
}
.home-item{
  padding: 5px;
  font-size: 12px;
  white-space: nowrap;
}
.big-num{
  font-size: 35px;
  color: #60b63c;
}
.border-left{
  padding-left: 18px;
  border-left: 1px solid #eee;
}
.iconfont{
  margin-right: 10px;
}
</style>
