<template>
  <div class="back" @click="$router.back()" style="paddingTop: 20px">
    <font-icon name="back" fontsize="25px"></font-icon>
  </div>
</template>
<style scoped>
.back{
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1000;
  color: #cecece;
}
</style>
