<template>
  <div>
    <d-header>银行卡</d-header>
    <group :gutter="0" ref="form">
      <x-input
        v-model="formData.BankUserName"
        title="用户名"
        required
        :disabled="isBank"
        :is-type="checkLimit"
        placeholder="请输入用户名"
        placeholder-align="right"
        text-align="right"></x-input>
      <selector
        title="银行"
        required
        :readonly="isBank"
        v-model="Bank"
        :options="bankList"
        placeholder="请选择银行"
        direction="rtl"></selector>
      <x-input
        v-if="Bank == '其他'"
        v-model="formData.Bank"
        title="银行名称"
        required
        :is-type="checkLimit"
        :disabled="isBank"
        placeholder="请输入银行"
        placeholder-align="right"
        text-align="right"></x-input>
      <x-input
        v-model="formData.Branch"
        title="开户行"
        required
        :is-type="checkLimit"
        :disabled="isBank"
        placeholder="请输入开户行"
        placeholder-align="right"
        text-align="right"></x-input>
      <x-input
        v-model="formData.BankCardNo"
        title="卡号"
        required
        :is-type="checkCardLimit"
        type="number"
        :disabled="isBank"
        placeholder="请输入卡号"
        placeholder-align="right"
        text-align="right"></x-input>
    </group>
    <div v-if="isBank" class="btn-main" @click="isBank = false">更换银行卡</div>
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
      formData: {
        Bank: '',
        BankCardNo: '',
        BankUserName: '',
        Branch: ''
      }
    }
  },
  mounted() {
    this.isBank && this.getBankInfo()
  },
  methods: {
    async getBankInfo() {
      let {data} = await this.$http.post('UserBank/GetList', {
        pageSize: 1,
        pageIndex: 1
      })
      if (data.Code == 1) {
        this.formData = JSON.parse(data.List)[0]
        this.Bank = this.bankList.indexOf(this.formData.Bank) > -1 ? this.formData.Bank : '其他'
      }
    },
    checkCardLimit(val) {
      if (/^.{1,30}$/.test(val)) {
        return {vaild: true}
      } else {
        return {valid: false, msg: '请输入30位以内卡号'}
      }
    },
    checkLimit(val) {
      if (/^.{1,20}$/.test(val)) {
        return {vaild: true}
      } else {
        return {valid: false, msg: '请不要超出20个字'}
      }
    },
    async bindCard() {
      let err = false
      this.$refs.form.$children.forEach(i => {
        err = (i.valid === false) || err
      })
      if (err) {
        this.$vux.toast.text('请填写正确信息')
        return false
      }
      if (this.Bank != '其他' && this.Bank != '') {
        this.formData.Bank = this.Bank
      }
      let {data} = await this.$http.post(`User/${this.formData.ID ? 'Edit' : ''}BindBank`, this.formData)
      if (data.Code == 1) {
        this.$vux.toast.text('绑定成功')
        this.$store.dispatch('getUserInfo')
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
