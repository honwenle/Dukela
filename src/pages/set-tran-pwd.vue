<template>
  <div class="bg-fff">
    <div class="bottom">
      <password v-if="show" :is-pay="false" :title="title" @finishpwd="inputDone"></password>
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
      title: '请输入交易密码',
      pwd: ''
    }
  },
  components: {
    Password
  },
  methods: {
    inputDone(pwd) {
      if (this.step == 0) {
        this.pwd = pwd
        this.title = '请再次输入交易密码'
        this.show = false
        this.$nextTick(() => {
          this.show = true
          this.step ++
        })
      } else {
        if (pwd == this.pwd) {
          // TODO: 设置交易密码
          this.$vux.alert.show({
            title: '交易密码设置成功！',
            content: '现可正常购买和入住！',
            buttonText: '我知道了',
            onHide: () => {
              this.$router.push('me')
            }
          })
        } else {
          this.$vux.toast.text('两次密码不一致')
        }
      }
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
