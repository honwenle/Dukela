<template>
  <div>
    <d-header>验证手机</d-header>
    <div class="center">
      <div v-if="inputPhone" style="padding: 50px 0 10px;">
        <div class="login-input">
          <font-icon name="wo"></font-icon>
          <input v-model="phone" type="text" pattern="[0-9]*" placeholder="输入手机号">
        </div>
      </div>
      <div v-else style="padding: 50px 0 10px;">
        <div>
          短信将会发送到您的手机
        </div>
        <div>
          {{dataInfo.Phone | hidePhone}}
        </div>
      </div>
      <sms-send v-model="vcode" :phone="inputPhone ? phone : dataInfo.Phone" :type="smsType"></sms-send>
      <div class="btn-main" @click="goNext">确定</div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    dataInfo() {
      return this.$store.state.UserInfo
    }
  },
  data() {
    return {
      phone: '',
      vcode: '',
      smsType: this.$route.params.smsType || 0,
      inputPhone: this.$route.params.inputPhone || false
    }
  },
  methods: {
    async goNext() {
      let data = await this.$store.dispatch('checkMsg', {
        ValidateCode: this.vcode
      })
      if (data.Code == 1) {
        this.$router.push(this.$route.params.nextPath)
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
