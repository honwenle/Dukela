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
      <div class="p" v-html="detailData.ProductContent || '暂无说明'"></div>
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
      id: this.$route.query.id,
      slideList: [{
        url: 'javascript:',
        img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
        title: '送你一朵fua'
      }, {
        url: 'javascript:',
        img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
        title: '送你一辆车'
      }, {
        url: 'javascript:',
        img: 'https://static.vux.li/demo/5.jpg', // 404
        title: '送你一次旅行',
        fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
      }]
    }
  },
  computed: {
    detailData() {
      return this.$store.state.productDetail
    }
  },
  mounted() {
    this.$store.dispatch('getProduct', {
      id: this.id
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
.h1{
  padding: 0 15px 8px;
}
.bottom-bar{
  padding: 15px;
  box-sizing: border-box;
}
.big{
  font-size: 18px;
}
</style>
