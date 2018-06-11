<template>
  <div>
    <d-header>支付订单<a slot="right">付费规则</a></d-header>
    <div class="group center pay-top">
      <div class="gray">
        支付剩余时间
        <clocker v-if="detailData.CreateTime" :time="detailData.CreateTime | PAYDATEFORMAT" format="%M：%S" @on-finish="onFinish">
        </clocker>
      </div>
      <div class="theme-color">总价：{{detailData.PayAmount}}元</div>
    </div>
    <div class="check-box">
      <!-- <div class="check-title">余额支付</div>
      <checklist v-model="forBalance" label-position="left" :options="[{key: 0, value: `账户余额：${balance}`}]"></checklist> -->
      <div class="check-title">第三方支付</div>
      <checklist @click.native="forPublic = []" label-position="left" :max="1" v-model="forThird" :options="payList"></checklist>
      <template v-if="type == 0">
        <div class="check-title">
          线下转账
          <popover placement="right" style="display: inline-block">
            <div slot="content" class="popover-content">
              需要24小时之内打款，订单3个工作日内未打款将失效，打款5个工作日内确认。
            </div>
            <font-icon name="help" color="#fe5900"></font-icon>
          </popover>
        </div>
        <checklist label-position="left" @click.native="forThird = []" v-model="forPublic" :options="['公司对公账号']"></checklist>
      </template>
    </div>
    <div class="btn-full" :class="{'btn-disable': timeout}" @click="pay">确认支付{{detailData.PayAmount}}元</div>
    <popup v-model="isShowPassword">
      <password @finishpwd="payBalance"></password>
    </popup>
  </div>
</template>
<script>
import {Checklist, Clocker, Popup, Popover, CheckIcon} from 'vux'
import Password from '@/components/password'
export default {
  components: {
    Checklist, Clocker, Popup, Popover, Password, CheckIcon
  },
  data() {
    return {
      id: this.$route.query.id,
      type: this.$route.query.type,
      isShowPassword: false,
      balance: 500,
      forThird: [],
      forPublic: [],
      forBalance: [],
      timeout: false,
      payList: [
        {
          key: 2,
          value: '微信支付'
        },
        {
          key: 3,
          value: '支付宝支付'
        },
        {
          key: 4,
          value: '银行卡支付'
        }
      ],
      errText:{
        9000: '支付成功',
        4000: '系统异常',
        4001: '数据格式不正确',
        4003: '该用户绑定的支付宝账户被冻结或不允许支付',
        4004: '该用户已解除绑定',
        4005: '绑定失败或没有绑定',
        4006: '订单支付失败',
        4010: '重新绑定账户',
        6000: '支付服务正在进行升级操作',
        6001: '用户中途取消支付操作'
      }
    }
  },
  computed: {
    detailData() {
      return this.$store.state.OrderDetail
    }
  },
  mounted() {
    this.$store.dispatch('getOrder', {
      id: this.id,
      type: this.type
    })
  },
  methods: {
    onFinish() {
      this.timeout = true
    },
    pay() {
      if (this.timeout) return false
      if (this.forThird.length == 1) {
        let type = this.forThird[0]
        if (type == 2) {
          this.payWechat()
        } else if (type == 3) {
          this.payAlipay()
        } else if (type == 4) {
          this.payUnion()
        }
      } else if (this.forPublic.length == 1) {
        this.$router.push('pay-public')
      } else if (this.forBalance.length == 1) {
        this.isShowPassword = true
      } else {
        this.$vux.toast.text('请选择支付方式')
      }
    },
    payBalance(pwd) {
      // 提交支付
      console.log(pwd)
      this.$router.push({
        name: 'Result'
      })
    },
    async payWechat() {
      let data = await this.$store.dispatch('wxPay', {
        OrderID: this.id,
        OrderType: this.type + 1
      })
      if (data.Code == 1) {
        var wxPay = api.require('weiXin')
        console.log(data.orderInfo)
        let orderInfo = JSON.parse(data.orderInfo)
        wxPay.payOrder({
          orderId: orderInfo.orderId,
          partnerId: orderInfo.partnerId,
          nonceStr: orderInfo.nonceStr,
          timeStamp: orderInfo.timeStamp,
          package: orderInfo.package,
          sign: orderInfo.sign
        }, (ret, err) => {
          this.goResult(ret.status, ret.status ? ret.result : err.msg)
        })
      } else {
        this.$vux.toast.text(data.Message)
      }
    },
    async payAlipay() {
      let data = await this.$store.dispatch('Alipay', {
        OrderID: this.id,
        OrderType: this.type + 1
      })
      if (data.Code == 1) {
        var aliPay = api.require('aliPay')
        aliPay.payOrder({
          orderInfo: data.orderInfo
        }, (ret, err) => {
          this.goResult(ret.code == 9000, this.errText[ret.code])
        })
      } else {
        this.$vux.toast.text(data.Message)
      }
    },
    payUnion() {
      this.$vux.toast.text('银联接口开发中')
    },
    goResult(status, content) {
      this.$router.push({
        name: 'Result',
        query: {
          status: status,
          type: this.type,
          title: status ? ['支付成功！', '预定成功！'][this.type] : '操作失败',
          content: status ? ['商品已进入您的商品库！', '请按时办理入住！'][this.type] : content
        }
      })
    }
  }
}
</script>
<style scoped>
.check-box{
  padding: 0 16px;
}
.check-title {
  font-size: 15px;
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
