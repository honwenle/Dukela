<template>
  <div class="center bg-fff">
    <realname-header :pervent="unRealname">实名认证</realname-header>
    <div class="pt20">请上传个人正面照片</div>
    <div class="img-upload">
      <img src="../assets/realname1.png" alt="">
      <input type="file">
    </div>
    <div class="btn-full">提交审核</div>
  </div>
</template>
<style scoped lang="less">
@import '../styles/login.less';
</style>
<script>
import RealnameHeader from '@/components/realname-header'
export default {
  components: {
    RealnameHeader
  }
}
</script>
