<template>
  <span :style="{color: color, fontSize: fontsize}" :class="'icon-' + name"></span>
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
@import "./style.css";
</style>
