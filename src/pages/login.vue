<template>
  <div class="center">
    <x-header></x-header>
    <div class="top">
      <div class="icon icon-users"></div>
      <div class="top-title">登录</div>
    </div>
    <div class="login-input">
      <font-icon name="wo"></font-icon>
      <input v-model="phone" type="text" pattern="[0-9]*" placeholder="输入手机号">
    </div>
    <div class="login-input">
      <font-icon name="key"></font-icon>
      <input v-model="password" type="password" placeholder="输入密码">
    </div>
    <div class="btn-main" :class="{'btn-disable': isDisable}" @click="submitBind">登录</div>
    <div class="a">忘记密码</div>
    <div class="sms-login">
        <div class="kksu">快速登录</div>
        <font-icon name="weixin_denglu" fontsize="40px" color="#369cfe"></font-icon>
    </div>
    <div class="bottom-tip a" @click="$router.replace({name: 'Register'})">
      新用户点此注册 <font-icon name="forward"></font-icon>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: '',
      password: ''
    }
  },
  computed: {
    isDisable() {
      return this.phone == '' || this.password == ''
    }
  },
  methods: {
    async submitBind() {
      if (this.isDisable) {
        return false
      }
      let data = await this.$store.dispatch('login', {
        UserName: this.phone,
        password: this.password
      })
      if (data.Code == 1) {
        this.$vux.toast.text('登录成功')
        this.$router.push({name: 'Me'})
      } else {
        this.$vux.toast.text(data.Message)
      }
    }
  }
}
</script>

<style scoped lang="less">
@import '../styles/login.less';
</style>
