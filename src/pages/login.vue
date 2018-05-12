<template>
  <div class="wrap-fff center">
    <x-header>登录</x-header>
    <div class="top">
      <div class="icon icon-users"></div>
    </div>
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
    <div class="btn-main" :class="{'btn-disable': isDisable}" @click="check">确定</div>
    <div class="a">忘记密码</div>
    <div class="sms-login">
        <div class="kksu">快速登录</div>
        <font-icon name="weixin_denglu" fontsize="40px" color="#369cfe"></font-icon>
    </div>
    <div class="bottom a">新用户点此注册 <font-icon name="forward"></font-icon></div>
    <x-dialog v-model="show1" hide-on-blur>
      <div class="wrap">
        <div class="title">用户协议</div>
        <div class="p">百度提醒您：在使用百度搜索引擎（以下简称百度）前，请您务必仔细阅读并透彻理解本声明。您可以选择不使用百度，但如果您使用百度，您的使用行为将被视为对本声明全部内容的认可。鉴于百度以非人工检索方式、根据您键入的关键字自动生成到第三方网页的链接，除百度注明之服务条款外，其他一切因使用百度而可能遭致的意外、疏忽、侵权及其造成的损失（包括因下载被搜索链接到的第三方网站内容而感染电脑病毒），百度对其概不负责，亦不承担任何法律责任。</div>
        <div class="btn-foot" @click="submitBind">同意并继续</div>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import { XDialog, Countdown } from 'vux'
export default {
  components: {
    XDialog, Countdown
  },
  data() {
    return {
      show1: false,
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
    check() {
      if (this.isDisable) {
        return false
      }
      this.show1 = true
    },
    async submitBind() {
      let {data} = await this.$http({
        method: 'post',
        url: '/User/BindPhone',
        data: {
          Phone: this.phone,
          ValidateCode: this.vcode
        }
      })
      data = {Code: 1} // TODO: ~TEST~
      if (data.Code == 1) {
        this.$vux.toast.text('绑定成功')
        this.$router.push({name: 'Me'})
      } else {
        this.$vux.toast.text(data.Message)
      }
    },
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
</style>
