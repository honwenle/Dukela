<template>
  <div class="back" @click="$router.back()">
    <font-icon name="back"></font-icon>
  </div>
</template>
<style scoped>
.back{
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1000;
  color: #fff;
  background: rgba(0,0,0,.25);
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  font-size: 25px;
  margin-top: 20px;
}
</style>
