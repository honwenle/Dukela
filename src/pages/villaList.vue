<template>
  <div class="fixed-bottom bg-fff">
    <d-header :showBack="false">
      入住预定
      <router-link v-if="!UserKey" slot="right" to="login" style="color: #60b63c">登录/注册</router-link>
    </d-header>
    <list
      action-name="getHomeList"
      :dataLength="dataList.length"
      :height="`-${67 + 50}px`"
    >
      <div class="list">
        <div v-for="i in 10" :key="i" class="home-item flex" @click="goVilla(i)">
          <div class="flex-1">
            <img class="img" src="https://o5omsejde.qnssl.com/demo/test1.jpg?type=webp" alt="">
          </div>
          <div class="flex-3">
            <div class="flex flex-center space-between">
              <div>乔顿山庄</div>
              <div class="fz12 theme-color">500人已入住</div>
            </div>
            <div class="fz12 gray">山庄简单介绍，100字山庄简单介绍，100字山庄简单介绍，100字</div>
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
      return this.$store.state.homeList
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
