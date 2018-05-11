<template>
  <div class="fixed-bottom">
    <back></back>
    <div class="group">
      <div class="swiper">
        <swiper :list="slideList" loop auto></swiper>
      </div>
      <div class="blue cell">￥<span style="font-size: 18px">2元</span></div>
      <div class="cell flex space-between bb">
        <div>山庄1项目30㎡</div>
        <div class="gray">剩余：500份</div>
      </div>
      <div class="cell gray">
        <font-icon name="address"></font-icon>
        <span>温州市鹿城区蒲中路222号李山投资集团</span>
      </div>
    </div>
    <div class="group">
      <div class="blue cell center">今日T值：0.3元/份</div>
    </div>
    <div class="group cell">
      <div class="h1">规则说明</div>
      <div class="p">购买商品即获得平台专属等值T。同时享有入住权和分红权。每份享有15%的分红权。限100份起售，每人最多购入1000份。7天无理由退货。</div>
    </div>
    <div class="group cell">
      <div class="h1">山庄介绍</div>
      <div>
        <p>山庄坐立在温州江滨之畔，环境清幽，交通便利，基础设施完善。。。。</p>
        <p>山庄坐立在温州江滨之畔，环境清幽，交通便利，基础设施完善。。。。</p>
        <p>山庄坐立在温州江滨之畔，环境清幽，交通便利，基础设施完善。。。。</p>
        <p>山庄坐立在温州江滨之畔，环境清幽，交通便利，基础设施完善。。。。</p>
      </div>
    </div>
    <div class="btn-full" @click="goBuy">立即购买</div>
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
</style>
