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
        background: this.color,
        paddingTop: '20px' // TODO: 根据isApp判断
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
    }
  },
  methods: {
    showMsg() {
      // TODO: 提示是否跳过实名
    }
  }
}
</script>
