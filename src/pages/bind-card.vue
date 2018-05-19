<template>
  <div class="center bg-fff">
    <x-header>绑定银行卡</x-header>
    <group :gutter="0">
      <x-input v-model="formData.Bank" title="用户名" placeholder="请输入用户名" placeholder-align="right"></x-input>
      <x-input v-model="formData.BankCardNo" title="银行" placeholder="请输入银行" placeholder-align="right"></x-input>
      <x-input v-model="formData.BankUserName" title="开户行" placeholder="请输入开户行" placeholder-align="right"></x-input>
      <x-input v-model="formData.Branch" title="卡号" placeholder="请输入卡号" placeholder-align="right"></x-input>
    </group>
    <div class="btn-main" @click="bindCard">确定</div>
  </div>
</template>
<script>
import RealnameHeader from '@/components/realname-header'
import {Group, XInput} from 'vux'
export default {
  components: {
    RealnameHeader, Group, XInput
  },
  data() {
    return {
      formData: {
        Bank: '',
        BankCardNo: '',
        BankUserName: '',
        Branch: ''
      }
    }
  },
  methods: {
    async bindCard() {
      let data = await this.$store.dispatch('bindCard', {
        UserKey: localStorage.getItem('UserKey'),
        ...this.formData
      })
      if (data.Code == 1) {
        this.$vux.toast.text('绑定成功')
        this.$router.back()
      } else {
        this.$vux.toast.text(data.Message)
      }
    }
  }
}
</script>
<style scoped lang="less">
@import '../styles/login.less';
</style>
