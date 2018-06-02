<template>
  <div class="bg-fff">
    <d-header :pervent="true"></d-header>
    <div class="bottom">
      <password v-if="show" :is-pay="false" :title="title[step]" @finishpwd="inputDone"></password>
    </div>
  </div>
</template>
<script>
import Password from '@/components/password'
export default {
  data() {
    return {
      show: true,
      step: 0,
      title: ['请输入交易密码', '请再次输入交易密码'],
      pwd: ''
    }
  },
  components: {
    Password
  },
  methods: {
    async inputDone(pwd) {
      if (this.step == 0) {
        this.pwd = pwd
        this.step ++
        this.reFresh()
      } else {
        if (pwd == this.pwd) {
          // TODO: 区分是否有短信验证码
          let {data} = await this.$http.post('User/UpdateSellPassword', {
            SellPassword: pwd
          })
          if (data.Code == 1) {
            if (this.$store.state.UserInfo.xxx) {
              this.$vux.toast.text('修改成功')
              this.$router.push('me')
            } else {
              this.$vux.alert.show({
                title: '交易密码设置成功！',
                content: '现可正常购买和入住！',
                buttonText: '我知道了',
                onHide: () => {
                  this.$router.push('me')
                }
              })
            }
          } else {
            this.$vux.toast.text(data.Message)
          }
        } else {
          this.$vux.toast.text('两次密码不一致, 请重新设置')
          this.step --
          this.reFresh()
        }
      }
    },
    reFresh() {
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
<style scoped>
.bottom{
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>
