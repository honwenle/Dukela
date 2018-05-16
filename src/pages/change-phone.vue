<template>
  <div>
    <x-header>手机号更换</x-header>
    <div class="wrap center bg-fff">
      <div>
        您绑定的手机号码为
      </div>
      <div>
        135****1234
      </div>
      <div class="btn-main" @click="$router.push('change-phone2')">更换</div>
    </div>
  </div>
</template>
<style scoped>
.wrap{
  padding-top: 30px;
}
</style>
