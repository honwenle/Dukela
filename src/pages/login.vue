<template>
  <div class="wrap-fff">
    <div class="top">
      <div class="icon icon-users"></div>
      <div class="top-title">请绑定手机号</div>
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

<style scoped>
.wrap-fff{
  background: #fff;
  position: absolute;
  width: 100%;
  height: 100%;
}
.a{
  color: #369cfe;
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  white-space: nowrap;
  text-align: right;
}
.top {
  padding: 80px 0 43px;
  text-align: center;
}
.top-title{
  display: inline-block;
  vertical-align: middle;
  font-size: 20px;
  margin-left: 10px;
  color: #369cfe;
}
.icon {
  display: inline-block;
  width: 39px;
  height: 39px;
  background-size: contain;
}
.icon-users {
  background-image: url('../assets/icon-user.png');
  vertical-align: middle;
}
.login-input {
  position: relative;
  margin: 0 auto;
  width: 75%;
  border: 1px solid #dadada;
  border-radius: 50px;
  margin-bottom: 20px;
}
.login-input.err{
  border-color: #f00;
}
.login-input .iconfont {
  color: #369cfe;
  margin: 0 20px;
  vertical-align: middle;
}
.login-input input {
  display: inline-block;
  width: 70%;
  height: 33px;
}
.login-input .vcode-input,.login-input .a{
  width: 35%;
}
.wrap{
  padding: 10px 0;
}
.title {
  font-size: 18px;
}
.p {
  font-size: 14px;
  text-align: left;
  padding: 10px 20px;
}
.btn-foot {
  color: #7dc3ff;
  border-top: 1px solid #ddd;
  padding-top: 5px;
}
</style>
