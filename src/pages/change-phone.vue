<template>
  <div>
    <d-header>绑定手机号</d-header>
    <div class="center" style="padding-top: 50px">
      <div class="login-input">
        <font-icon name="wo"></font-icon>
        <input v-model="phone" type="text" pattern="[0-9]*" placeholder="输入手机号">
      </div>
      <sms-send v-model="vcode" :phone="phone" :type="6"></sms-send>
      <div class="btn-main" @click="submitNewPhone">确定</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: '',
      vcode: '',
      msgTime: 60,
      msgStatus: false,
      oldSmsID: this.$store.state.SmsID
    }
  },
  computed: {
    SmsID() {
      return this.$store.state.SmsID
    },
    isDisable() {
      return this.phone == '' || this.vcode == ''
    }
  },
  methods: {
    async submitNewPhone() {
      if (this.isDisable) return false
      let {data} = await this.$http.post('User/EditPhone', {
        OldSmsID: this.oldSmsID,
        SmsID: this.SmsID,
        Phone: this.phone,
        ValidateCode: this.vcode
      })
      if (data.Code == 1) {
        this.$vux.toast.text('修改成功')
        this.$router.push('me')
      }
    }
  }
}
</script>

<style scoped lang="less">
@import '../styles/login.less';
</style>
