<template>
  <div>
    <x-header
      :left-options="{
        preventGoBack: pervent
      }"
      @on-click-back="showMsg"
    >
      <slot></slot>
    </x-header>
    <x-dialog v-model="show" :dialog-style="{'width': '50%', 'padding': '30px'}">
      <div class="theme-color">
        <div>
          通过实名认证和密码设置才能正常购买
        </div>
        <div class="btn-main" @click="show = false">继续填写</div>
        <div class="xd-close" @click="$router.go(-2)">
          <font-icon name="Artboard" fontsize="20px"></font-icon>
        </div>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import {XDialog} from 'vux'
export default {
  components: {
    XDialog
  },
  props: {
    pervent: {
      default: true
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    showMsg() {
      this.show = true
    }
  }
}
</script>

<style scoped lang="less">
@import '../styles/login.less';
</style>
