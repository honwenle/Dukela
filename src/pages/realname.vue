<template>
  <div class="center bg-fff">
    <d-header :pervent="true">实名认证</d-header>
    <div class="pt20">请上传身份证正面</div>
    <div class="img-upload">
      <img src="../assets/realname1.png" alt="">
      <input type="file">
    </div>
    <div class="pt20 pb20">请确认您的信息</div>
    <div class="login-input">
      <font-icon name="key"></font-icon>
      <input v-model="name" type="password" placeholder="输入姓名">
    </div>
    <div class="login-input">
      <font-icon name="key"></font-icon>
      <input v-model="idcard" type="password" placeholder="输入身份证号">
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
  data() {
    return {
      name: '',
      idcard: ''
    }
  },
  computed: {
    isDisable() {
      return this.name == '' || this.idcard == ''
    }
  },
  methods: {
    nextStep() {
      this.$router.replace({
        name: 'Realname3'
      })
    }
  }
}
</script>

<style scoped lang="less">
@import '../styles/login.less';
</style>
