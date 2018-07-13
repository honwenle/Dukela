<template>
  <div>
    <d-header>设置</d-header>
    <group :gutter="0">
      <cell title="版本信息" link="version">{{version}}版</cell>
      <!-- <cell title="帮助" link="help"></cell>
      <cell title="意见反馈" link="feedback"></cell>
      <cell title="推送设置" link="set-push"></cell> -->
    </group>
    <div class="btn-main" v-show="UserKey" @click="logout">退出</div>
  </div>
</template>
<script>
import { Group, Cell } from 'vux'
export default {
  components: {
    Group, Cell
  },
  computed: {
    UserKey() {
      return this.$store.state.UserKey
    }
  },
  methods: {
    logout() {
      this.$store.commit('clearUserInfo')
      this.$vux.toast.text('退出成功')
      this.$router.back()
    }
  }
}
</script>
