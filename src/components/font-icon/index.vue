<template>
  <span :style="{color: color, fontSize: fontsize}" :class="'iconfont icon-' + name"></span>
</template>
<script>
export default {
  props: {
    name: String,
    color: {
      default: ''
    },
    fontsize: {
      default: '16px'
    }
  }
}
</script>
<style scoped>
/* @import "./iconfont.css"; */
@import "//at.alicdn.com/t/font_659107_bcz35tba8yk.css";
.iconfont{
  display: inline-block;
  vertical-align: middle;
}
</style>
