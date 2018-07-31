<template>
  <div>
    <d-header>山庄地址</d-header>
    <div id="bmap"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: {}
    }
  },
  computed: {
    VillaDetail() {
      return this.$store.state.VillaDetail
    }
  },
  mounted() {
    this.map = new BMap.Map('bmap')
    this.map.centerAndZoom(new BMap.Point(120.69843, 28.000576), 11)
    var myGeo = new BMap.Geocoder()
    myGeo.getPoint(this.VillaDetail.ProvinceName + this.VillaDetail.CityName + this.VillaDetail.AreaName + this.VillaDetail.Address, (p) => {
      if (p) {
        this.map.centerAndZoom(p, 16)
        this.map.addOverlay(new BMap.Marker(p))
      } else {
        console.log('没找到！')
      }
    })
  }
}
</script>
<style scoped>
#bmap{
  width: 100%;
  height: calc(100vh - 66px);
}
</style>
