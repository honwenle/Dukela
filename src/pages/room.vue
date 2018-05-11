<template>
  <div>
    <back></back>
    <div class="group">
      <div class="swiper">
        <swiper :list="slideList" loop auto></swiper>
      </div>
      <div class="flex space-between flex-center cell">
        <div class="orange">
          <div>现金支付：￥400</div>
          <div>T支付：￥390</div>
        </div>
        <div>
          <div class="btn-sm" @click="goOrder">预定</div>
        </div>
      </div>
    </div>
    <div class="group">
      <div class="cell">
        <font-icon name="address"></font-icon>
        <span>温州市鹿城区蒲中路222号李山投资集团</span>
      </div>
    </div>
    <div class="group cell">
      <div class="h1">房间简介</div>
      <div class="p">房间水电费自费，电费：1元/度；水费：5元/顿。房间必需品免费提供，只需拎包入住。</div>
    </div>
    <div class="group cell">
      <div class="h1">房间简介</div>
      <div class="p">山庄坐立在温州江滨之畔，环境清幽，交通便利，基础设施完善。。。。山庄坐立在温州江滨之畔，环境清幽，交通便利，基础设施完善。。。。%的分红权。限100份起售，每人最多购入1000份。7天无理由退货。</div>
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
    goOrder() {
      this.$router.push({
        name: 'Reserve'
      })
    }
  }
}
</script>
<style scoped>
.btn-sm{
  padding: 5px 20px;
}
</style>
