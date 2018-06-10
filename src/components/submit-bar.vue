<template>
  <div class="bottom-bar flex flex-center">
    <div class="bar-content flex-1">
      合计：<div class="price">{{price}}</div>
      <slot></slot>
    </div>
    <button class="bar-button" @click="$emit('onSubmit')">{{button}}</button>
  </div>
</template>
<script>
export default {
  props: ['price', 'button']
}
</script>
<style scoped lang="less">
.bottom-bar{
  height: 50px;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  border-top: 1px solid #eee;
}
.bar-content{
  text-align: right;
  padding: 0 20px;
}
.bar-button{
  background: @main-color;
  font-size: 15px;
  color: #fff;
  width: 110px;
  height: 100%;
}
</style>
