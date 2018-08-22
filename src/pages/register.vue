<template>
  <div class="center page--register">
    <d-header>注册</d-header>
    <div class="top">
      <div class="icon icon-users"></div>
      <div class="top-title">注册</div>
    </div>
    <div class="login-input">
      <font-icon name="wo"></font-icon>
      <input v-model="phone" type="text" pattern="[0-9]*" placeholder="输入手机号">
    </div>
    <sms-send v-model="vcode" :phone="phone" :type="4"></sms-send>
    <div class="login-input">
      <font-icon name="yaoqingma"></font-icon>
      <input v-model="InvitationCode" type="text" placeholder="如有邀请人，请输入邀请码">
    </div>
    <agreement v-model="readed"></agreement>
    <div class="btn-main" :class="{'btn-disable': isDisable}" @click="submitBind">注册</div>
    <div class="a" @click="$router.replace({name: 'Login'})">
      已有账号，点此登录
      <font-icon name="forward"></font-icon>
    </div>
  </div>
</template>
<script>
import Agreement from '@/components/agreement'
export default {
  components: {
    Agreement
  },
  data() {
    return {
      phone: '',
      vcode: '',
      readed: false
    }
  },
  computed: {
    isDisable() {
      return this.phone == '' || this.vcode == ''
    },
    InvitationCode() {
      return this.$store.state.InvitationCode
    }
  },
  methods: {
    async submitBind() {
      if (!this.readed) {
        this.$vux.toast.text('请先同意注册协议')
        return false
      }
      this.$store.commit('setInvitationCode', this.InvitationCode)
      let data = await this.$store.dispatch('checkMsg', {
        ValidateCode: this.vcode
      })
      if (data.Code == 1) {
        this.$router.push({
          name: 'SetPassword',
          params: {
            type: 1
          }
        })
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
