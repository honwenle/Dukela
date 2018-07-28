<template>
  <div>
    <d-header>{{helpDetail.Title}}</d-header>
    <p v-html="helpDetail.Content"></p>
  </div>
</template>
<script>
export default {
  computed: {
    helpDetail() {
      return this.$store.state.helpDetail
    }
  }
}
</script>
