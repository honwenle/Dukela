<template>
  <div class="back" @click="$router.back()">
    <font-icon name="back" fontsize="25px"></font-icon>
  </div>
</template>
<style scoped>
.back{
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
  color: #cecece;
}
</style>
