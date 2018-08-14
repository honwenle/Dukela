<template>
  <div>
    <div class="login-input">
      <font-icon name="key"></font-icon>
      <input @input="$emit('input', vcode)" v-model="vcode" class="vcode-input" type="number" placeholder="输入验证码">
      <span class="a" v-if="msgStatus">
        <countdown v-model="msgTime" :start="msgStatus" @on-finish="msgRenew"></countdown>秒后重新发送
      </span>
      <span v-else class="a" @click="sendMsg">获取验证码</span>
    </div>
    <div v-show="type == 6" class="tip">如您无法收验证码，请联系客服：0577-88689777</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      vcode: '',
      msgTime: 60,
      msgStatus: false
    }
  },
  computed: {
    _phone() {
      return this.phone
    }
  },
  props: {
    value: [String],
    phone: [String],
    type: {
      default: 0
    }
  },
  methods: {
    msgRenew() {
      this.msgTime = 60
      this.msgStatus = false
    },
    async sendMsg() {
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)) {
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

<style scoped lang="less">
@import '../styles/login.less';
</style>
