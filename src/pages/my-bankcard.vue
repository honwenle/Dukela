<template>
  <div>
    <d-header>
      银行卡<span slot="right">提现说明</span>
    </d-header>
    <div class="wrap">
      <div class="card">还未绑卡，请绑定</div>
    </div>
    <div class="btn-main" @click="$router.push({name: 'BindCard'})">去绑卡</div>
  </div>
</template>
<style scoped>
.wrap{
  padding: 20px;
}
.card{
  background: #c1c1c1;
  color: #797979;
  text-align: center;
  height: 145px;
  border-radius: 10px;
  box-shadow: 8px 8px 24px #d0d0d0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
