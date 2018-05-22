<template>
  <div>
    <x-header>支付订单<a slot="right">付费规则</a></x-header>
    <div class="group center pay-top">
      <div class="gray">
        支付剩余时间
        <clocker :time="msgTime" format="%M：%S" @on-finish="onFinish">
        </clocker>
      </div>
      <div class="theme-color">总价：300元</div>
    </div>
    <div v-if="deduct">
      <div class="check-box">
        <div class="check-title">使用商品抵扣 <span class="orange">(只需390元)</span></div>
        <checklist :max="1" label-position="left" :options="goodsList"></checklist>
      </div>
      <div class="bottom-bar">
        <div class="flex">
          <div class="flex-2 text-right">商品抵扣100元，剩余需支付<span class="theme-color">200</span>元</div>
          <div class="flex-1 btn-sm" @click="afterDeduct">下一步</div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="check-box">
        <div class="check-title">余额支付</div>
        <checklist label-position="left" :options="[{key: 0, value: `账户余额：${balance}`}]"></checklist>
        <div class="check-title">第三方支付</div>
        <checklist label-position="left" :max="1" :options="payList"></checklist>
        <template v-if="offline">
          <div class="check-title">
            线下转账
            <popover placement="right" style="display: inline-block">
              <div slot="content" class="popover-content">
                需要24小时之内打款，订单3个工作日内未打款将失效，打款5个工作日内确认。
              </div>
              <font-icon name="home1" fontsize="22px" color="#fe5900"></font-icon>
            </popover>
          </div>
          <checklist label-position="left" :options="['公司对公账号']"></checklist>
        </template>
      </div>
      <div class="btn-full" @click="pay">确认支付300元</div>
    </div>
    <popup v-model="isShowPassword">
      <password></password>
    </popup>
  </div>
</template>
<script>
import {Checklist, Clocker, Popup, Popover} from 'vux'
import Password from '@/components/password'
export default {
  components: {
    Checklist, Clocker, Popup, Popover, Password
  },
  data() {
    return {
      offline: this.$route.query.offline,
      deduct: this.$route.query.deduct,
      isShowPassword: false,
      msgTime: '2018-05-30 15:30',
      balance: 500,
      goodsList: [
        {
          key: 1,
          value: '山庄1项目30㎡',
          inlineDesc: '商品数：500份     T数：500个'
        },
        {
          key: 2,
          value: '山庄2项目30㎡',
          inlineDesc: '商品数：500份     T数：500个'
        }
      ],
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
    afterDeduct() {
      this.deduct = 0
    },
    onFinish() {
      console.log('计时结束')
    },
    pay() {
      console.log('发起支付')
      this.isShowPassword = true
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
.pay-top .theme-color{
  font-size: 20px;
  margin: 5px 0;
}
.popover-content{
  padding: 12px;
  font-size: 12px;
  border: 1px solid #eee;
}
</style>
