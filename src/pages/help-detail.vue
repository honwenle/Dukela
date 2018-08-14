<template>
  <div>
    <d-header>帮助</d-header>
    <div class="p-content">
      <div class="p-title">{{helpDetail.Title}}</div>
      <div v-html="helpDetail.Content"></div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    helpDetail() {
      return this.$store.state.helpDetail
    }
  }
}
</script>
<style scoped>
.p-title{
  font-size: 18px;
  text-align: center;
  margin: 10px;
}
.p-content{
  padding: 15px;
  font-size: 16px;
  background: #fff;
}
</style>
