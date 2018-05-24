<template>
  <div :class="{'theme-color-header': tran}">
    <x-header
    @on-click-back="showMsg"
    :left-options="{showBack: showBack, backText: '', preventGoBack: pervent}"
    :style="headStyle">
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
        paddingTop: this.isApp ? (api.systemType == 'ios' && '23px') || (api.systemType == 'android' && '28px'): '0'
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
    }
  },
  methods: {
    showMsg() {
      // TODO: 提示是否跳过实名
    }
  }
}
</script>
