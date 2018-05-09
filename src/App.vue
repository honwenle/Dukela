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
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
.win-wrap{
  position: absolute;
  width: 100%;
  height: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
body {
  background-color: #eee;
}
input{
  border: none;
}
.goods-empty {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  background: #eee;
  color: #888;
  padding-top: 30%;
  box-sizing: border-box;
}
.goods-empty img {
  width: 5em;
}
.flex{
  display: flex;
}
.btn-main {
  text-align: center;
  background: #369cfe;
  color: #fff;
  font-size: 14px;
  width: 45%;
  margin: 16px auto;
  border-radius: 30px;
  padding: 5px 0;
  box-shadow: 2px 2px 8px #369cfe;
}
.btn-main.btn-disable {
  background: #cecece;
  box-shadow: 2px 2px 8px #c7c7c7;
}
</style>
