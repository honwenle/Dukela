<template>
  <div class="wrap-fff center">
    <x-header>设置密码</x-header>
    <div class="top">
      <div class="icon icon-users"></div>
      <div class="top-title">设置登录密码</div>
    </div>
    <div class="login-input">
      <font-icon name="key"></font-icon>
      <input v-model="pwd1" type="password" placeholder="输入密码">
    </div>
    <div class="login-input">
      <font-icon name="key"></font-icon>
      <input v-model="pwd2" type="password" placeholder="再次输入密码">
    </div>
    <div class="btn-main" :class="{'btn-disable': isDisable}" @click="checkPassword">确定</div>
    <div class="bottom-tip a" @click="$router.replace({name: 'Login'})">
      已有账号，点此登录 <font-icon name="forward"></font-icon>
    </div>
    <confirm v-model="show1"
      confirm-text="前往实名认证"
      cancel-text="跳过"
      @on-cancel="$router.go(-2)"
      @on-confirm="goRealname">
        <div>
          <font-icon name="dui" fontsize="40px" color="#88c66e"></font-icon>
        </div>
        <div>注册成功！</div>
        <div>完成实名认证后方可购买！</div>
    </confirm>
  </div>
</template>
<script>
import {XDialog, Confirm} from 'vux'
export default {
  components: {
    XDialog, Confirm
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
      let data = await this.$store.dispatch('register', {
        password: this.pwd1
      })
      if (data.Code == 1) {
        this.show1 = true
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
