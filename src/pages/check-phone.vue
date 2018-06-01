<template>
  <div>
    <d-header>验证手机</d-header>
    <div class="center">
      <div style="padding-top: 50px">
        短信将会发送到您的手机
      </div>
      <div style="padding-bottom: 10px">
        {{dataInfo.Phone | hidePhone}}
      </div>
      <sms-send v-model="vcode" :phone="dataInfo.Phone" :type="1"></sms-send>
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
      vcode: ''
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
