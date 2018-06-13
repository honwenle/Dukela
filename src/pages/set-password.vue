<template>
  <div class="center">
    <d-header>设置密码</d-header>
    <div class="top" v-show="isReg">
      <div class="icon icon-users"></div>
      <div class="top-title">设置登录密码</div>
    </div>
    <div class="login-input" style="margin-top: 50px">
      <font-icon name="key"></font-icon>
      <input v-model="pwd1" type="password" placeholder="输入密码">
    </div>
    <div class="login-input">
      <font-icon name="key"></font-icon>
      <input v-model="pwd2" type="password" placeholder="再次输入密码">
    </div>
    <div class="btn-main" :class="{'btn-disable': isDisable}" @click="checkPassword">确定</div>
    <re-confirm
      :show="show1"
      go-name="realname"
      button="前往实名认证"
      title="注册成功！"
      content="完成实名认证后方可购买！"/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import ReConfirm from '@/components/re-confirm'
export default {
  components: {
    ReConfirm
  },
  data() {
    return {
      isReg: this.$route.params.type,
      show1: false,
      pwd1: '',
      pwd2: ''
    }
  },
  computed: {
    isDisable() {
      return this.pwd1 == '' || this.pwd2 == ''
    },
    ...mapState([
      'SmsID',
      'SmsPhone',
      'SmsVCode',
      'UserKey'
    ])
  },
  methods: {
    checkPassword() {
      if (this.isDisable) {
        return false
      }
      if (!/^.*(?=.{6,12})(?=.*\d)(?=.*[A-Za-z]).*$/.test(this.pwd1)) {
        this.$vux.toast.text('密码等级过低，请设置6-12位英文+数字密码')
        return false
      }
      if (this.pwd1 !== this.pwd2) {
        this.$vux.toast.text('再次输入密码不一致')
        return false
      }
      if(this.isReg) {
        this.submitPassword()
      } else {
        this.updatePwd()
      }
    },
    async updatePwd() {
      let api = this.UserKey ? 'UpdatePassWord' : 'FindPassWord'
      let {data} = await this.$http.post('User/' + api, {
        SmsID: this.SmsID,
        Phone: this.SmsPhone,
        ValidateCode: this.SmsVCode,
        PassWord: this.pwd1
      })
      if (data.Code == 1) {
        this.$store.commit('clearUserInfo')
        this.$vux.alert.show({
          title: '修改成功',
          content: '请重新登录',
          onHide: () => {
            this.$router.push('login')
          }
        })
      } else {
        this.$vux.toast.text(data.Message)
      }
    },
    async submitPassword() {
      let data = await this.$store.dispatch('register', {
        password: this.pwd1
      })
      if (data.Code == 1) {
        this.show1 = true
        this.$store.dispatch('getUserInfo')
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
