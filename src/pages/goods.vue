<template>
  <div class="fixed-bottom">
    <back></back>
    <div class="group">
      <div class="swiper">
        <swiper :list="slideList" loop auto></swiper>
      </div>
      <div class="cell">{{detailData.ProductName}}</div>
      <div class="cell flex space-between bb">
        <div class="theme-color">已售：{{detailData.ProductUsedCount}}小时</div>
        <div class="gray">剩余：{{detailData.ProductLessCount}}小时</div>
      </div>
      <div class="cell gray">
        <font-icon name="address"></font-icon>
        <span>温州市鹿城区蒲中路222号李山投资集团</span>
      </div>
    </div>
    <!-- <div class="group">
      <div class="theme-color cell center">今日T值：0.3元/份</div>
    </div> -->
    <div class="h1">规则说明</div>
    <div class="group cell">
      <div>
        <span class="gray">属性</span>
        <span>购买可得{{detailData.ShareRate}}W</span>
      </div>
      <div>
        <span class="gray">服务</span>
        <span>入住权·7天无理由退货</span>
      </div>
      <div v-if="detailData.ProductContent">
        <span class="gray">规则</span>
        <span v-html="detailData.ProductContent"></span>
      </div>
    </div>
    <div class="h1">山庄介绍</div>
    <div class="group cell">
      <div v-html="detailData.ProRemark || '暂无介绍'"></div>
    </div>
    <div class="bottom-bar">
      <span class="theme-color big">{{detailData.ProductCost}}</span> 元/小时
      <div class="float-right btn-inline" @click="goBuy">立即购买</div>
    </div>
  </div>
</template>
<script>
import {Swiper} from 'vux'
import Back from '@/components/back'
export default {
  components: {
    Swiper, Back
  },
  data() {
    return {
      id: this.$route.query.id
    }
  },
  computed: {
    slideList() {
      return this.$store.state.ProductPic.map(item => {
        return {
          url: 'javascript:;',
          img: this.$imgUrl + item.Url,
          title: ''
        }
      })
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
.bottom-bar{
  padding: 15px;
  box-sizing: border-box;
}
.big{
  font-size: 18px;
}
</style>
