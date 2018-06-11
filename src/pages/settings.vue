<template>
  <div>
    <d-header>设置</d-header>
    <group :gutter="0">
      <cell title="版本信息" link="version">1.0版</cell>
    </group>
    <div class="btn-main" @click="logout">退出</div>
  </div>
</template>
<script>
import { Group, Cell } from 'vux'
export default {
  components: {
    Group, Cell
  },
  methods: {
    logout() {
      this.$store.commit('clearUserInfo')
      this.$vux.toast.text('退出成功')
      this.$router.push('login')
    }
  }
}
</script>
