<template>
  <div class="fixed-bottom">
    <div class="list">
      <list
        action-name="getVillaList"
        :dataLength="dataList.length"
        :height="`-${67 + 50}`"
      >
        <div>
          <div v-for="(item, i) in dataList" :key="i" class="home-item flex" @click="goVilla(item.ID)">
            <div class="flex-1">
              <img class="img" :src="$imgUrl + item.BigPicUrl">
            </div>
            <div class="flex-3">
              <div class="flex flex-center space-between">
                <div class="fz17">{{item.BeadhouseName}}</div>
                <div class="fz12 theme-color">{{(Number(item.AppReserveCount) + Number(item.ReserveCount)) || 0}}人已入住</div>
              </div>
              <div class="fz14 gray">{{item.BeadhouseTitle}}</div>
            </div>
          </div>
        </div>
      </list>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    dataList() {
      return this.$store.state.villaList
    }
  },
  methods: {
    goVilla(id) {
      this.$router.push({
        name: 'Villa',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style scoped>
.list{
  padding: 0 18px;
}
.img{
  width: 62px;
  height: 62px;
  vertical-align: middle;
  border-radius: 5px;
}
</style>
