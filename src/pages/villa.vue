<template>
  <div>
    <back></back>
    <div class="group">
      <div class="swiper">
        <swiper :list="slideList" loop auto></swiper>
      </div>
      <div class="cell bb fz16">{{detailData.BeadhouseName}}</div>
      <div class="cell flex space-between">
        <div class="gray">
          <font-icon name="address"></font-icon>
          <span>{{detailData.ProvinceName+detailData.CityName+detailData.AreaName+detailData.Address}}</span>
        </div>
        <div>
          <a :href="`tel:${detailData.ContactTel}`" class="theme-color">
            <font-icon name="phone"></font-icon>
          </a>
        </div>
      </div>
    </div>
    <div class="h1">房间预定</div>
    <div class="group cell">
      <div class="room-list" v-if="roomList.length > 0">
        <div class="room flex" v-for="item in roomList" :key="item.ID">
          <div class="flex-1">
            <img class="img" :src="$imgUrl + item.BigPicUrl">
          </div>
          <div class="flex-4">
            <div class="ellipsis">{{item.TypeName}}</div>
            <div class="gray">{{item.EquipmentContent}}</div>
            <div class="price">{{item.RoomPrice}}</div>
          </div>
          <div class="flex-2 text-right">
            <span class="btn-inline" style="padding: 3px 26px" @click="goRoom(item.ID)">预定</span>
          </div>
        </div>
      </div>
      <div v-else>
        暂无房间
      </div>
    </div>
    <div class="h1">山庄介绍</div>
    <div class="page-content">
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
      return this.$store.state.VillaDetail
    },
    roomList() {
      return this.$store.state.RoomList
    }
  },
  mounted() {
    this.$store.dispatch('getVilla', {
      ID: this.id
    })
    this.$store.dispatch('getVillaPic', {
      BeadhouseID: this.id
    })
    this.$store.dispatch('getRoomList', {
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
