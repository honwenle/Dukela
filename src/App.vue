<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    // TODO: 返回桌面
    window.api && window.api.addEventListener({
        name: 'myBack'
    }, (ret, err) => {
      this.$router.back()
    })
    this.$store.dispatch('getConfig')
    localStorage.getItem('UserKey') && this.$store.dispatch('getUserInfo')
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './styles/main.less';
</style>
