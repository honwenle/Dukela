<template>
  <div class="bottom-bar flex flex-center">
    <div class="bar-content flex-1">
      <slot name="labelText">合计：</slot><div class="price">{{price | decimal}}</div>
      <slot></slot>
    </div>
    <button class="bar-button" :class="{'disabled': disabled}" @click="clickSubmit">{{button}}</button>
  </div>
</template>
<script>
export default {
  props: ['price', 'button', 'disabled', 'needReal'],
  computed: {
    UserKey() {
      return this.$store.state.UserKey
    },
    UserInfo() {
      return this.$store.state.UserInfo
    }
  },
  mounted() {
    this.needReal && this.UserKey && this.$store.dispatch('getUserInfo')
  },
  methods: {
    clickSubmit() {
      if (this.disabled) return false
      if (this.needReal && this.UserKey && !this.UserInfo.IsCardID) {
        this.$vux.confirm.show({
          title: '去实名认证',
          content: '实名认证之后方可继续操作',
          confirmText: '去认证',
          onConfirm: () => {
            this.$router.push('realname')
          }
        })
        return false
      }
      this.$emit('onSubmit')
    }
  }
}
</script>
<style scoped lang="less">
.bottom-bar{
  height: 50px;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  border-top: 1px solid #eee;
}
.bar-content{
  text-align: right;
  padding: 0 20px;
}
.bar-button{
  background: @main-color;
  font-size: 15px;
  color: #fff;
  width: 110px;
  height: 100%;
}
.bar-button.disabled{
  background: #eee;
  color: #000;
}
</style>
