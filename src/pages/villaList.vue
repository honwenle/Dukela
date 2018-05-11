<template>
  <div class="fixed-bottom bg-fff order-wrap">
    <div class="list">
      <div v-for="i in 10" :key="i" class="home-item flex" @click="goVilla(i)">
        <div class="flex-1">
          <img class="img" src="https://o5omsejde.qnssl.com/demo/test1.jpg?type=webp" alt="">
        </div>
        <div class="flex-3">
          <div class="flex flex-center space-between">
            <div>乔顿山庄</div>
            <div class="fz12 orange">500人已入住</div>
          </div>
          <div class="fz12 gray">山庄简单介绍，100字山庄简单介绍，100字山庄简单介绍，100字</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
  padding: 18px;
}
.img{
  width: 62px;
  height: 62px;
  vertical-align: middle;
}
</style>
