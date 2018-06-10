<template>
  <div class="bottom-bar flex flex-center">
    <div class="bar-content flex-1">
      合计：<div class="price">{{price}}</div>
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
  methods: {
    clickSubmit() {
      if (this.disabled) return false
      if (this.needReal) {
        if (this.needReal && this.UserKey && !this.UserInfo.IsCardID) {
          this.$vux.confirm.show({
            title: '实名提示',
            content: '是否立即实名',
            onCancel: () => {
              this.$emit('onSubmit')
            },
            onConfirm: () => {
              this.$router.push('realname')
            }
          })
        }
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
