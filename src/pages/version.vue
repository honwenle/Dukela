<template>
  <div class="bg-fff">
    <d-header>版本信息</d-header>
    <div class="version">
      <img src="../assets/ic_launcher.png" class="img">
      <div class="ver-title">版本{{version}}</div>
      <div class="ver-content">「都可拉」为全球旅居共享平台，<br>致力于为用户提供卓越的居住体验服务。</div>
    </div>
  </div>
</template>
<style scoped>
.version{
  text-align: center;
  padding-top: 30px;
}
.ver-title{
  margin-bottom: 20px;
  font-size: 16px;
}
.ver-content{
  padding: 0 12%;
}
.img{
  width: 90px;
}
</style>
