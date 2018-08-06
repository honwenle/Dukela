<template>
  <div>
    <d-header>{{helpDetail.Title}}</d-header>
    <div class="p-content" v-html="helpDetail.Content"></div>
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
.p-content{
  padding: 15px;
  font-size: 16px;
  background: #fff;
}
</style>
