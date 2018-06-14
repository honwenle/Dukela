<template>
  <div class="fixed-bottom">
    <keep-alive>
      <welcome v-if="isShowWelcome" @hideWelcome="isShowWelcome = false"></welcome>
    </keep-alive>
    <d-header :showBack="false">
      都可拉
      <router-link v-if="!UserKey" slot="right" to="login" style="color: #60b63c">登录/注册</router-link>
    </d-header>
    <list
      action-name="getHomeList"
      :dataLength="dataList.length"
      :height="`-${67 + 50}`"
    >
      <div>
        <div class="top">
          <swiper :list="homeBanner | bannerArr('BigPicUrl')" loop auto></swiper>
        </div>
        <div class="list" style="padding: 0 16px;">
          <div class="home-item"  @click="goGoods(item.ID)" v-for="(item, i) in dataList" :key="i">
            <div class="bb home-item-h1" style="padding: 6px 15px">
              <font-icon name="home1" color="#6e9cff"></font-icon>
              <div class="line-block">{{item.ProductName}}</div>
            </div>
            <div class="flex flex-center" style="padding: 10px 15px 7px">
              <div class="flex-1">
                <div class="gray">价格（元/小时）</div>
                <div class="big-num">{{item.ProductCost}}</div>
              </div>
              <div class="flex-1 border-left">
                <div class="gray">
                  <font-icon name="rmb"></font-icon>
                  <span class="black">已出售</span>
                  <span class="theme-color">{{item.AppProductUsedCount}}小时</span>
                </div>
                <div class="gray">
                  <font-icon name="stock"></font-icon>
                  <span class="black">剩余{{item.ProductLessCount}}小时</span>
                </div>
              </div>
              <div class="flex-1 text-right">
                <div class="btn-outline orange">抢购</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </list>
  </div>
</template>
<script>
import Welcome from '@/components/welcome'
export default {
  components: {Welcome},
  data() {
    return {
      homeBanner: [],
      isShowWelcome: !localStorage.getItem('welcomeflag')
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
    this.getHomebanner()
  },
  methods: {
    async getHomebanner() {
      let {data} = await this.$http.post('AppBanner/GetList', {
        pageSize: 10,
        pageIndex: 1,
        orderby: ''
      })
      if (data.Code == 1) {
        this.homeBanner = JSON.parse(data.List)
      }
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
.home-item-h1{
  font-size: 16px;
}
</style>
