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
.vux-header{
  border-bottom: 1px #eee solid;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
html, body{
  -webkit-touch-callout:none;
  -webkit-text-size-adjust:none;
  -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
  -webkit-user-select:none;
}
body {
  background-color: #eee;
  color: #545454;
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
.btn-outline{
  border: 1px solid #369cfe;
  border-radius: 50px;
  display: inline-block;
  color: #369cfe;
  padding: 2px 15px;
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
.flex.space-between{
  justify-content: space-between;
}
.flex-center{
  align-items: center;
}
.text-right{
  text-align: right;
}
.flex-1{
  flex: 1;
}
.flex-2{
  flex: 2;
}
.flex-3{
  flex: 3;
}
.flex-5{
  flex: 5;
}
#app .weui-tabbar{
  position: fixed;
}
.btn-sm {
  background: #369cfe;
  color: #fff;
  font-size: 13px;
  padding: 5px 8px;
  text-align: center;
}
.group {
  margin-bottom: 8px;
  background: #fff;
}
.bb{
  border-bottom: 1px solid #eee;
}
.blue{
  color: #369cfe;
}
.cell {
  padding: 5px 10px;
}
.center{
  text-align: center;
}
.gray{
  color: #b2b2b2;
}
.btn-full {
  width: 100%;
  background: #369cfe;
  color: #fff;
  text-align: center;
  line-height: 3;
  font-size: 18px;
  position: fixed;
  bottom: 0;
}
.fixed-bottom{
  padding-bottom: 50px;
  box-sizing: border-box;
}
.home-item {
  background: rgba(255,255,255,.8);
  border-radius: 5px;
  margin: 18px 0;
  padding: 16px;
  box-shadow: 0 0 15px #a4c4ff;
}
.small{
  font-size: 12px;
}
.fz14{
  font-size: 14px;
}
.fz12{
  font-size: 12px;
}
.orange{
  color: #fe5900;
}
.h1{
  color: #545454;
  font-weight: 600;
}
.float-right{
  float: right;
}
.feature-item{
  font-size: 12px;
  display: inline-block;
  margin-right: 10px;
}
.bottom-bar {
  position: fixed;
  width: 100%;
  background: #fff;
  bottom: 0;
  font-size: 13px;
}
.bottom-bar .flex > div{
  padding: 15px;
}
.bottom-bar .btn-sm{
  font-size: 13px;
}
.bg-fff{
  position: absolute;
  width: 100%;
  min-height: 100%;
  background-color: #fff;
}
</style>
