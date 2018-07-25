<template>
  <div>
    <d-header :tran="true" :theme-color="true">
      提现
      <div slot="right">提现规则</div>
    </d-header>
    <group>
      <cell :title="bankinfo.Bank"
        :inline-desc="bankinfo.BankCardNo"
        is-link
        >
      </cell>
    </group>
    <group>
      <x-input title="手机号"
        :value="UserInfo.Phone | hidePhone"
        disabled>
      </x-input>
      <x-input title="验证码" placeholder="请填写验证码" v-model="vcode">
        <vcode slot="right" :phone="UserInfo.Phone" :type="1"></vcode>
      </x-input>
    </group>
    <group>
      <x-input title="金额"
        v-model="amount"
        :placeholder="`最多可提现${UserInfo.AccountBalance}元`">
        <span slot="right"
          class="theme-color"
          @click="amount = UserInfo.AccountBalance">
          全部提现
        </span>
      </x-input>
    </group>
    <div class="weui-cell">手续费：￥{{fee}}</div>
    <div class="btn-main" :class="{'btn-disable': isDisable}" @click="submitWithdraw">立即提现</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      amount: '',
      vcode: '',
      bankinfo: {},
      WithdrawRate: 0
    }
  },
  computed: {
    fee() {
      return Math.ceil(this.WithdrawRate * this.amount) / 100
    },
    SmsID() {
      return this.$store.state.SmsID
    },
    isDisable() {
      return this.amount == '' || this.vcode == ''
    },
    UserInfo() {
      return this.$store.state.UserInfo
    }
  },
  mounted() {
    this.getWithdrawRate()
    this.getBankInfo()
  },
  methods: {
    async getWithdrawRate() {
      let {data} = await this.$http.post('SysConfig/GetModel', {ID: 1})
      if (data.Code == 1) {
        this.WithdrawRate = data.Info.Withdrawals
      }
    },
    async submitWithdraw() {
      if (this.isDisable) {
        return false
      }
      if (!this.SmsID) {
        this.$vux.toast.text('请先获取验证码')
        return false
      }
      let {data} = await this.$http.post('User/Withdrawals', {
        SmsID: this.SmsID,
        ValidateCode: this.vcode,
        Amount: this.amount,
        BlankID: this.bankinfo.ID
      })
      if (data.Code == 1) {
        this.$router.push({
          path: 'withdraw-result',
          query: {
            id: 0 // TODO: 接口返回id
          }
        })
      }
      this.$vux.toast.text(data.Message)
    },
    async getBankInfo() {
      let {data} = await this.$http.post('UserBank/GetList', {
        pageSize: 1,
        pageIndex: 1
      })
      if (data.Code == 1) {
        this.bankinfo = JSON.parse(data.List)[0]
      }
    }
  }
}
</script>
