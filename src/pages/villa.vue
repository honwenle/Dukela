<template>
  <div>
    <back></back>
    <div class="group">
      <div class="swiper">
        <swiper :list="slideList" loop auto></swiper>
      </div>
      <div class="cell bb">{{detailData.BeadhouseName}}</div>
      <div class="cell flex space-between">
        <div class="gray">
          <font-icon name="address"></font-icon>
          <span>{{detailData.ProvinceName+detailData.CityName+detailData.AreaName+detailData.Address}}</span>
        </div>
        <div>
          <a :href="`tel:${110}`" class="theme-color">
            <font-icon name="phone"></font-icon>
          </a>
        </div>
      </div>
    </div>
    <div class="h1">房间预定</div>
    <div class="group cell">
      <div class="room-list">
        <div class="room flex" v-for="i in 3" :key="i">
          <div class="flex-1">
            <img class="img" src="https://o5omsejde.qnssl.com/demo/test1.jpg?type=webp" alt="">
          </div>
          <div class="flex-4">
            <div>高级大床房30㎡</div>
            <div>
              <span class="gray feature-item" v-for="(item, i) in ['厨房','空调','洗衣机','独卫']" :key="i">{{item}}</span>
            </div>
            <div class="theme-color">￥190</div>
          </div>
          <div class="flex-2 center">
            <span class="btn-inline" style="padding: 3px 26px" @click="goRoom(i)">预定</span>
          </div>
        </div>
      </div>
    </div>
    <div class="h1">山庄介绍</div>
    <div class="group cell">
      <div v-html="detailData.BeadhouseContent || '暂无介绍'"></div>
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
      return this.$store.state.VillaPic.map(item => {
        return {
          url: 'javascript:;',
          img: this.$imgUrl + item.Url,
          title: ''
        }
      })
    },
    detailData() {
      return this.$store.state.villaDetail
    }
  },
  mounted() {
    this.$store.dispatch('getVilla', {
      id: this.id
    })
    this.$store.dispatch('getVillaPic', {
      BeadhouseID: this.id
    })
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
.room:first-child{
  border: none;
}
</style>
