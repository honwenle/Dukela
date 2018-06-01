<template>
  <div>
    <d-header>银行卡</d-header>
    <group :gutter="0">
      <x-input
        v-model="formData.BankUserName"
        title="用户名"
        :disabled="isBank"
        placeholder="请输入用户名"
        placeholder-align="right"
        text-align="right"></x-input>
      <selector
        title="银行"
        :disabled="isBank"
        v-model="Bank"
        :options="bankList"
        placeholder="请选择银行"
        direction="rtl"></selector>
      <x-input
        v-if="Bank == '其他'"
        v-model="formData.Bank"
        title="银行名称"
        :disabled="isBank"
        placeholder="请输入银行"
        placeholder-align="right"
        text-align="right"></x-input>
      <x-input
        v-model="formData.Branch"
        title="开户行"
        :disabled="isBank"
        placeholder="请输入开户行"
        placeholder-align="right"
        text-align="right"></x-input>
      <x-input
        v-model="formData.BankCardNo"
        title="卡号"
        :disabled="isBank"
        placeholder="请输入卡号"
        placeholder-align="right"
        text-align="right"></x-input>
    </group>
    <div v-if="isBank" class="btn-main" @click="bindCard">更换银行卡</div>
    <div v-else class="btn-main" @click="bindCard">确定</div>
  </div>
</template>
<script>
import {XInput, Selector} from 'vux'
export default {
  components: {
    XInput, Selector
  },
  data() {
    return {
      isBank: this.$route.params.isBank,
      Bank: '',
      bankList: [
        '中国工商银行',
        '招商银行',
        '中国光大银行',
        '中信银行',
        '浦发银行',
        '广发银行',
        '华夏银行',
        '中国建设银行',
        '中国农业银行',
        '交通银行',
        '中国银行',
        '中国民生银行',
        '兴业银行',
        '平安银行',
        '其他'
      ],
      // TODO: 读取已绑卡信息
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
      if (this.Bank != '其他' && this.Bank != '') {
        this.formData.Bank = this.Bank
      }
      let data = await this.$store.dispatch('bindCard', this.formData)
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
