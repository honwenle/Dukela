<template>
  <div>
    <back></back>
    <div class="group">
      <div class="swiper">
        <swiper :list="slideList" loop auto></swiper>
      </div>
      <div class="cell">
        <font-icon name="address"></font-icon>
        <span>温州市鹿城区蒲中路222号李山投资集团</span>
      </div>
    </div>
    <div class="group cell">
      <div class="h1">房间预定</div>
      <div class="room-list">
        <div class="room flex flex-center" v-for="i in 3" :key="i" @click="goRoom(i)">
          <div class="flex-1">
            <img class="img" src="https://o5omsejde.qnssl.com/demo/test1.jpg?type=webp" alt="">
          </div>
          <div class="flex-5">
            <div>
              <span>高级大床房30㎡</span>
              <span class="float-right orange">￥200</span>
            </div>
            <div>
              <span class="gray feature-item" v-for="(item, i) in ['厨房','空调','洗衣机','独卫']" :key="i">{{item}}</span>
              <span class="float-right orange">T：190</span>
            </div>
          </div>
        </div>
      </div>
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
    goRoom(id) {
      this.$router.push({
        name: 'Room',
        query: {
          id: id
        }
      })
    }
  }
}
</script>
<style scoped>
.img{
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
.room{
  border-top: 1px solid #eee;
  padding: 5px 0;
}
</style>
