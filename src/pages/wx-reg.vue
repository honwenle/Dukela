<template>
  <div>
    <d-header>绑定手机</d-header>
    <div class="center">
      <div style="padding: 50px 0 10px;">
        <div class="login-input">
          <font-icon name="wo"></font-icon>
          <input v-model="phone" type="text" pattern="[0-9]*" placeholder="输入手机号">
        </div>
      </div>
      <sms-send v-model="vcode" :phone="phone" :type="4"></sms-send>
      <div class="login-input">
        <font-icon name="yaoqingma"></font-icon>
        <input v-model="InvitationCode" type="text" placeholder="如有邀请人，请输入邀请码">
      </div>
      <agreement v-model="readed"></agreement>
      <div class="btn-main" @click="submitWxReg">确定</div>
    </div>
  </div>
</template>
<script>
import Agreement from '@/components/agreement'
export default {
  components: {
    Agreement
  },
  computed: {
    dataInfo() {
      return this.$store.state.wxInfo
    },
    InvitationCode() {
      return this.$store.state.InvitationCode
    }
  },
  data() {
    return {
      phone: '',
      vcode: '',
      readed: false
    }
  },
  methods: {
    async submitWxReg() {
      if (!this.readed) {
        this.$vux.toast.text('请先同意注册协议')
        return false
      }
      this.$store.commit('setInvitationCode', this.InvitationCode)
      let data = await this.$store.dispatch('wxReg', {
        ValidateCode: this.vcode
      })
      if (data.Code == 1) {
        this.$store.dispatch('getUserInfo')
        this.$router.push('me')
      } else {
        this.$vux.toast.text(data.Message)
      }
    }
  }
}
</script>
<style scoped>
@import '../styles/login.less';
</style>
