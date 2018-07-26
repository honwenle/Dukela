<template>
  <div :style="center ? 'text-align: center' : ''">
    <span class="bor">NEW</span>
    今日 T={{TRate}}
  </div>
</template>
<script>
export default {
  computed: {
    TRate() {
      return this.$store.state.Config.TProportion
    }
  },
  props: {
    center: {
      default: false
    }
  }
}
</script>
<style lang="less" scoped>
.bor {
  color: @theme-color;
  border: 1px solid;
  display: inline-block;
  font-size: 12px;
  padding: 0 5px;
  margin-right: 10px;
}
</style>
