<template>
  <div>
    <x-header>商品买入</x-header>
    <div class="group center pay-top">
      <div class="gray">
        支付剩余时间
        <clocker :time="msgTime" format="%M：%S" @on-finish="onFinish">
        </clocker>
      </div>
      <div class="blue">总价：300元</div>
    </div>
    <div class="check-box">
      <div class="check-title">余额支付</div>
      <checklist label-position="left" :options="[{key: 0, value: `账户余额：${balance}`}]"></checklist>
      <div class="check-title">第三方支付</div>
      <checklist label-position="left" :max="1" :options="payList"></checklist>
      <div class="check-title">线下转账</div>
      <checklist label-position="left" :options="['公司对公账号']"></checklist>
    </div>
    <div class="btn-full" @click="pay">确认支付300元</div>
  </div>
</template>
<script>
import {Checklist, Clocker} from 'vux'
export default {
  components: {
    Checklist, Clocker
  },
  data() {
    return {
      msgTime: '2018-05-12 15:30',
      balance: 500,
      payList: [
        {
          key: 0,
          value: '微信支付'
        },
        {
          key: 1,
          value: '支付宝支付'
        },
        {
          key: 2,
          value: '银行卡支付'
        }
      ]
    }
  },
  methods: {
    onFinish() {
      console.log('计时结束')
    },
    pay() {
      console.log('发起支付')
    }
  }
}
</script>
<style scoped>
.check-box{
  padding: 16px;
}
.check-title {
  font-size: 20px;
  padding: 5px 0;
}
.pay-top{
  padding: 15px 0;
}
.pay-top .blue{
  font-size: 20px;
  margin: 5px 0;
}
</style>
