<template>
  <div class="fixed-bottom">
    <back></back>
    <div class="group">
      <div class="swiper">
        <swiper :list="slideList | bannerArr" loop auto></swiper>
      </div>
      <div class="cell bb">
        <div class="fz16" style="padding-bottom: 5px">{{detailData.ProductName}}</div>
        <div class="flex space-between">
          <div class="theme-color">已售：{{detailData.ProductUsedCount}}小时</div>
          <div class="gray">剩余：{{detailData.ProductLessCount}}小时</div>
        </div>
      </div>
      <div class="cell">
        <today-t></today-t>
      </div>
    </div>
    <div class="h1">规则说明</div>
    <div class="group cell">
      <div class="row-gap flex">
        <span class="gray">属性</span>
        <span>购买可得{{detailData.ShareRate}}W</span>
      </div>
      <div class="row-gap flex">
        <span class="gray">服务</span>
        <span>入住权·7天无理由退货</span>
      </div>
      <div class="row-gap flex" v-if="detailData.ProductContent">
        <span class="gray">规则</span>
        <span v-html="detailData.ProductContent"></span>
      </div>
    </div>
    <div class="h1">商品介绍</div>
    <div class="page-content">
      <div v-html="detailData.ProRemark || '暂无介绍'"></div>
    </div>
    <submit-bar
      :price="detailData.ProductCost"
      @onSubmit="goBuy"
      :needReal="true"
      :disabled="!detailData.IsSelf"
      :button="detailData.IsSelf ? '立即购买' : '即将上线'">
      <span slot="labelText">单价：</span>
    </submit-bar>
  </div>
</template>
<script>
import Back from '@/components/back'
export default {
  components: {
    Back
  },
  data() {
    return {
      id: this.$route.query.id
    }
  },
  computed: {
    slideList() {
      return this.$store.state.ProductPic
    },
    detailData() {
      return this.$store.state.ProductDetail
    }
  },
  mounted() {
    this.$store.dispatch('getProduct', {
      id: this.id
    })
    this.$store.dispatch('getProductPic', {
      ProductID: this.id
    })
  },
  methods: {
    goBuy() {
      this.$router.push({
        name: 'Buy',
        query: {
          id: this.id
        }
      })
    }
  }
}
</script>
<style scoped>
.p{
  color: #545454;
  font-weight: 300;
}
.big{
  font-size: 18px;
}
</style>
