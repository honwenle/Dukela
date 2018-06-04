<template>
  <div class="fixed-bottom">
    <d-header :showBack="false">
      入住预定
      <router-link v-if="!UserKey" slot="right" to="login" style="color: #60b63c">登录/注册</router-link>
    </d-header>
    <list
      action-name="getVillaList"
      :dataLength="dataList.length"
      :height="`-${67 + 50}px`"
    >
      <div class="list">
        <div v-for="(item, i) in dataList" :key="i" class="home-item flex" @click="goVilla(item.ID)">
          <div class="flex-1">
            <img class="img" :src="$imgUrl + item.BigPicUrl">
          </div>
          <div class="flex-3">
            <div class="flex flex-center space-between">
              <div>{{item.BeadhouseName}}</div>
              <div class="fz12 theme-color">{{item.ReserveCount || 0}}人已入住</div>
            </div>
            <div class="fz12 gray">{{item.BeadhouseTitle}}</div>
          </div>
        </div>
      </div>
    </list>
  </div>
</template>
<script>
export default {
  computed: {
    dataList() {
      return this.$store.state.villaList
    },
    UserKey() {
      return this.$store.state.UserKey
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
}
</style>
