<template>
  <span class="theme-color">
    <span v-if="msgStatus">
      <countdown v-model="msgTime" :start="msgStatus" @on-finish="msgRenew"></countdown>秒后重新发送
    </span>
    <span v-else @click="sendMsg">获取验证码</span>
  </span>
</template>
<script>
export default {
  data() {
    return {
      msgTime: 60,
      msgStatus: false
    }
  },
  props: ['phone', 'type'],
  methods: {
    msgRenew() {
      this.msgTime = 60
      this.msgStatus = false
    },
    async sendMsg() {
      if (this.phone && !/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)) {
        this.$vux.toast.text('手机号不正确')
        return false
      }
      let data = await this.$store.dispatch('sendMsg', {
        Phone: this.phone,
        SmsType: this.type
      })
      if (data.Code == 1) {
        this.$vux.toast.text('发送成功')
        this.msgStatus = true
      } else {
        this.$vux.toast.text(data.Message)
      }
    }
  }
}
</script>
