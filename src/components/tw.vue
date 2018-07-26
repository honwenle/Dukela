<template>
  <group label-width="100px">
    <cell title="W(个)" value-align="left" :value="www"></cell>
    <cell title="T(个)" value-align="left" :value="ttt"></cell>
  </group>
</template>
<script>
export default {
  props: ['num', 'w', 'price'],
  computed: {
    TRate() {
      return this.$store.state.Config.TProportion
    },
    www() {
      return (this.num * this.w / 100) || 0
    },
    ttt() {
      return (Math.floor(this.num * this.price * 10000 / this.TRate) / 10000) || 0
    }
  }
}
</script>
