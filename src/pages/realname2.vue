<template>
  <div class="wrap-fff center">
    <realname-header :pervent="unRealname">实名认证</realname-header>
    <div class="pt20 pb20">请确认您的信息</div>
    <div class="login-input">
      <font-icon name="key"></font-icon>
      <input v-model="name" type="password" placeholder="输入姓名">
    </div>
    <div class="login-input">
      <font-icon name="key"></font-icon>
      <input v-model="idcard" type="password" placeholder="输入身份证号">
    </div>
    <div class="flex">
      <div class="btn-main outline" @click="nextStep('Realname')">重拍</div>
      <div class="btn-main" :class="{'btn-disable': isDisable}" @click="nextStep('Realname3')">确认无误</div>
    </div>
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
    nextStep(route) {
      this.$router.replace({
        name: route
      })
    }
  }
}
</script>

<style scoped lang="less">
@import '../styles/login.less';
</style>
