<template>
  <div class="center bg-fff">
    <realname-header>实名认证</realname-header>
    <div class="pt20">请上传身份证正面</div>
    <div class="img-upload">
      <img src="../assets/realname1.png" alt="">
      <input type="file">
    </div>
    <div class="btn-full" @click="nextStep">确认上传</div>
  </div>
</template>
<script>
import RealnameHeader from '@/components/realname-header'
export default {
  components: {
    RealnameHeader
  },
  methods: {
    nextStep() {
      this.$router.replace({
        name: 'Realname2'
      })
    }
  }
}
</script>

<style scoped lang="less">
@import '../styles/login.less';
</style>
