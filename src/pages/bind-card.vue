<template>
  <div class="center bg-fff">
    <realname-header>绑定银行卡</realname-header>
    <group :gutter="0">
      <x-input title="用户名" placeholder="请输入用户名" placeholder-align="right" disabled></x-input>
      <x-input title="银行" placeholder="请输入银行" placeholder-align="right"></x-input>
      <x-input title="开户行" placeholder="请输入开户行" placeholder-align="right"></x-input>
      <x-input title="卡号" placeholder="请输入卡号" placeholder-align="right"></x-input>
    </group>
    <div class="btn-main">确定</div>
  </div>
</template>
<style scoped lang="less">
@import '../styles/login.less';
</style>
<script>
import RealnameHeader from '@/components/realname-header'
import {Group, XInput} from 'vux'
export default {
  components: {
    RealnameHeader, Group, XInput
  }
}
</script>
