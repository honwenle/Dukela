<template>
  <div class="center">
    <d-header></d-header>
    <div class="top">
      <div class="icon icon-users"></div>
      <div class="top-title" @click="wxCancelAuth">登录</div>
    </div>
    <div class="login-input">
      <font-icon name="wo"></font-icon>
      <input v-model="phone" type="text" pattern="[0-9]*" placeholder="输入手机号">
    </div>
    <div class="login-input">
      <font-icon name="key"></font-icon>
      <input v-model="password" type="password" placeholder="输入密码">
    </div>
    <div class="flex space-between switch-login">
      <div class="a" @click="$router.replace({name: 'Register'})">免费注册</div>
      <div class="a" @click="forgetPwd">忘记密码</div>
    </div>
    <div class="btn-main" :class="{'btn-disable': isDisable}" @click="submitLogin">登录</div>
    <div class="sms-login">
        <div class="kksu">快速登录</div>
        <font-icon name="weixin_denglu" fontsize="40px" @click.native="wxAuth"></font-icon>
    </div>
  </div>
</template>
<script>
import wxMixin from '@/mixins/wx'
export default {
  mixins: [wxMixin],
  data() {
    return {
      phone: '',
      password: '',
      weiXinPlugin: window.api.require('weiXin')
    }
  },
  computed: {
    isDisable() {
      return this.phone == '' || this.password == ''
    }
  },
  methods: {
    forgetPwd() {
      this.$router.push({
        name: 'CheckPhone',
        params: {
          inputPhone: true,
          smsType: 5,
          nextPath: 'set-password'
        }
      })
    },
    afterWxAuth(ret) {
      this.$http.post('User/GetModelByOpenID', {
        OpenID: ret.openid
      }).then(({data}) => {
        if (data.Code == 1) {
          this.$store.commit('setUserKey', data.UserKey)
          this.$store.dispatch('getUserInfo')
          this.$router.push('me')
        } else {
          this.$router.push('wx-reg')
        }
      }).catch(err => {
        alert(err)
      })
    },
    async submitLogin() {
      if (this.isDisable) {
        return false
      }
      let data = await this.$store.dispatch('login', {
        UserName: this.phone,
        password: this.password
      })
      if (data.Code == 1) {
        this.$vux.toast.text('登录成功')
        this.$store.dispatch('getUserInfo')
        this.$router.push({name: 'Me'}) // XXX: 哪来哪去
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
