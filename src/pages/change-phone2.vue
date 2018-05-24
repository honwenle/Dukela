<template>
  <div>
    <d-header>验证旧手机</d-header>
    <div class="wrap center bg-fff">
      <div class="login-input">
        <font-icon name="wo"></font-icon>
        <input v-model="phone" type="text" pattern="[0-9]*" placeholder="输入手机号">
      </div>
      <div class="login-input">
        <font-icon name="key"></font-icon>
        <input v-model="vcode" class="vcode-input" type="number" placeholder="输入验证码">
        <span class="a" v-if="msgStatus">
          <countdown v-model="msgTime" :start="msgStatus" @on-finish="msgRenew"></countdown>秒后重新发送
        </span>
        <span v-else class="a" @click="sendMsg">获取验证码</span>
      </div>
      <div class="fz12">如您无法收验证码，请联系客服：0577-86588682</div>
      <div class="btn-main">确定</div>
    </div>
  </div>
</template>
<script>
import { Countdown } from 'vux'
export default {
  components: {
    Countdown
  },
  data() {
    return {
      phone: '',
      vcode: '',
      msgTime: 60,
      msgStatus: false
    }
  },
  computed: {
    isDisable() {
      return this.phone == '' || this.vcode == ''
    }
  },
  methods: {
    msgRenew() {
      this.msgTime = 60
      this.msgStatus = false
    },
    async sendMsg() {
      let {data} = await this.$http({
        method: 'post',
        url: '/SysSMS/Send',
        data: {
          Phone: this.phone
        }
      })
      data = {Code: 1} // TODO: ~TEST~
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
.wrap{
  padding-top: 30px;
}
</style>
