<template>
  <div>
    <d-header>绑定账号</d-header>
    <div class="center">
      <div style="padding: 50px 0 10px;">
        <div class="login-input">
          <font-icon name="wo"></font-icon>
          <input v-model="phone" type="text" pattern="[0-9]*" placeholder="输入手机号">
        </div>
      </div>
      <div class="login-input">
        <font-icon name="key"></font-icon>
        <input v-model="vcode" class="vcode-input" type="number" placeholder="输入验证码">
        <span class="a" v-if="msgStatus">
          <countdown v-model="msgTime" :start="msgStatus" @on-finish="msgRenew"></countdown>秒后重新发送
        </span>
        <span v-else class="a" @click="sendMsg">获取验证码</span>
      </div>
      <div class="btn-main" @click="submitBind">确定</div>
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
      SmsID: ''
    }
  },
  methods: {
    msgRenew() {
      this.msgTime = 60
      this.msgStatus = false
    },
    async sendMsg() {
      let {data} = await this.$http.post('SysSMS/Send2', {
        Phone: this.phone,
        SmsType: 1
      })
      if (data.Code == 1) {
        this.SmsID = data.Model
        this.msgStatus = true
        this.$vux.toast.text('发送成功')
      } else if (data.Code == 2) {
        this.$vux.confirm.show({
          title: '您的账号还未注册',
          content: '请先注册',
          confirmText: '去注册',
          onConfirm: () => {
            this.$router.push('register')
          }
        })
      } else {
        this.$vux.toast.text(data.Message)
      }
    },
    async submitBind() {
      let {data} = await this.$http.post('User/BindUser', {
        SmsID: this.SmsID,
        Phone: this.phone,
        ValidateCode: this.vcode
      })
      if (data.Code == 1) {
        this.$vux.toast.text('绑定成功')
        this.$router.back()
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
