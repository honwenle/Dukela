<template>
  <div class="center">
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
    <div class="fz12">点击注册，即代表同意<div class="a" @click="show1 = true">《TIME平台用户协议》</div></div>
    <div class="btn-main" :class="{'btn-disable': isDisable}" @click="submitBind">注册</div>
    <div class="bottom-tip a" @click="$router.replace({name: 'Login'})">
      已有账号，点此登录 <font-icon name="forward"></font-icon>
    </div>
    <x-dialog v-model="show1" hide-on-blur>
      <div class="wrap">
        <div class="title">用户协议</div>
        <div class="p">百度提醒您：在使用百度搜索引擎（以下简称百度）前，请您务必仔细阅读并透彻理解本声明。您可以选择不使用百度，但如果您使用百度，您的使用行为将被视为对本声明全部内容的认可。鉴于百度以非人工检索方式、根据您键入的关键字自动生成到第三方网页的链接，除百度注明之服务条款外，其他一切因使用百度而可能遭致的意外、疏忽、侵权及其造成的损失（包括因下载被搜索链接到的第三方网站内容而感染电脑病毒），百度对其概不负责，亦不承担任何法律责任。</div>
        <div class="btn-foot" @click="show1 = false">同意并继续</div>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import { XDialog } from 'vux'
export default {
  components: {
    XDialog
  },
  data() {
    return {
      show1: false,
      phone: '',
      vcode: ''
    }
  },
  computed: {
    isDisable() {
      return this.phone == '' || this.vcode == ''
    }
  },
  methods: {
    async submitBind() {
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
