<template>
  <div class="wrap-fff center">
    <x-header>设置密码</x-header>
    <div class="top">
      <div class="icon icon-users"></div>
      <div class="top-title">设置登录密码</div>
    </div>
    <div class="login-input">
      <font-icon name="key"></font-icon>
      <input v-model="pwd1" type="password" placeholder="输入手机号">
    </div>
    <div class="login-input">
      <font-icon name="key"></font-icon>
      <input v-model="pwd2" type="password" placeholder="输入密码">
    </div>
    <div class="btn-main" :class="{'btn-disable': isDisable}" @click="checkPassword">确定</div>
    <div class="bottom-tip a" @click="$router.replace({name: 'Login'})">
      已有账号，点此登录 <font-icon name="forward"></font-icon>
    </div>
    <x-dialog hide-on-blur v-model="show1" :dialog-style="{'width': '50%', 'padding': '30px 0'}">
      <div class="theme-color">
        <div>
          15268701773 <br> 注册成功!
        </div>
        <div class="btn-main" @click="goRealname">进入实名认证</div>
        <div class="xd-close" @click="show1 = false">
          <font-icon name="Artboard" fontsize="20px"></font-icon>
        </div>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import {XDialog} from 'vux'
export default {
  components: {
    XDialog
  },
  data() {
    return {
      show1: false,
      pwd1: '',
      pwd2: ''
    }
  },
  computed: {
    isDisable() {
      return this.pwd1 == '' || this.pwd2 == ''
    }
  },
  methods: {
    goRealname() {
      this.$router.replace({
        name: 'Realname'
      })
    },
    checkPassword() {
      if (this.isDisable) {
        return false
      }
      if (!/^.*(?=.{6,12})(?=.*\d)(?=.*[A-Za-z]).*$/.test(this.pwd1)) {
        this.$vux.toast.text('密码等级过低，请设置6-12位英文+数字密码')
        return false
      }
      if (this.pwd1 !== this.pwd2) {
        this.$vux.toast.text('再次输入密码不一致')
        return false
      }
      this.submitPassword()
    },
    async submitPassword() {
      this.show1 = true
    }
  }
}
</script>

<style scoped lang="less">
@import '../styles/login.less';
</style>
