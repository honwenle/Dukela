<template>
  <div>
    <back></back>
    <div class="group">
      <div class="swiper">
        <swiper :list="slideList" loop auto></swiper>
      </div>
      <div class="cell bb fz15">{{detailData.TypeName}}</div>
      <div class="cell flex space-between">
        <div class="gray">
          <font-icon name="address"></font-icon>
          <span>{{VillaData.ProvinceName+VillaData.CityName+VillaData.AreaName+VillaData.Address}}</span>
        </div>
        <div>
          <a :href="`tel:${VillaData.ContactTel}`" class="theme-color">
            <font-icon name="phone"></font-icon>
          </a>
        </div>
      </div>
    </div>
    <div class="h1">规则说明</div>
    <div class="group cell">
      <div class="row-gap"><span class="gray">附属设备</span> {{detailData.EquipmentContent}}</div>
      <div class="row-gap"><span class="gray">重要事项</span> {{detailData.RoomImportContent}}</div>
    </div>
    <div class="h1">房间简介</div>
    <div class="page-content">
      <div v-html="detailData.RoomContent"></div>
    </div>
    <submit-bar
      :price="detailData.RoomPrice"
      @onSubmit="goOrder"
      :needReal="true"
      :disabled="detailData.UnUseRoomCount <= 0"
      button="立即预定">
    </submit-bar>
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
      return this.$store.state.RoomPic.map(item => {
        return {
          url: 'javascript:;',
          img: this.$imgUrl + item.Url,
          title: ''
        }
      })
    },
    detailData() {
      return this.$store.state.RoomDetail
    },
    VillaData() {
      return this.$store.state.VillaDetail
    }
  },
  mounted() {
    this.$store.dispatch('getRoom', {
      ID: this.id
    })
    this.$store.dispatch('getRoomPic', {
      BeadhouseRoomID: this.id
    })
  },
  methods: {
    goOrder() {
      this.$store.commit('clearDeduct')
      this.$router.push({
        name: 'Reserve'
      })
    }
  }
}
</script>
<style scoped>
.big{
  font-size: 18px;
}
</style>
