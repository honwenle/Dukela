<template>
  <div :class="{'theme-color-header': tran, 'dheader': true, 'theme-bg': themeColor}" :style="headStyle">
    <x-header
      @on-click-back="showMsg"
      :left-options="{showBack: showBack, backText: '', preventGoBack: pervent}"
    >
      <slot></slot>
      <div slot="right">
        <slot name="right"></slot>
      </div>
    </x-header>
  </div>
</template>
<script>
export default {
  data() {
    return {
      headStyle: {
        paddingTop: '20px' // 根据isApp判断
        // paddingTop: this.isApp ? (api.systemType == 'ios' && '20px') || (api.systemType == 'android' && '25px'): '0'
      }
    }
  },
  props: {
    pervent: {
      default: false
    },
    tran: {
      default: false
    },
    showBack: {
      default: true
    },
    themeColor: {
      default: false
    },
    typeText: {
      default: 1
    }
  },
  methods: {
    showMsg() {
      this.$vux.confirm.show({
        content: '完成实名认证设置交易密码方可购买！',
        confirmText: '继续',
        cancelText: '跳过',
        onCancel: () => {
          this.$router.push('me')
        }
      })
    }
  }
}
</script>
