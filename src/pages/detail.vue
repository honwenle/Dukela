<template>
  <div class="page--detail">
    <d-header :tran="true" :theme-color="true">
      商品购入详情
      <div slot="right" v-if="isPay" @click="cancelOrder">取消订单</div>
    </d-header>
    <div class="detail">
      <div class="detail-top">
        <div class="detail-title" v-if="isPay">
          待支付，剩
          <clocker v-if="detail.CreateTime" :time="detail.CreateTime | PAYDATEFORMAT" format="%M分%S秒" @on-finish="detail.OrderStatus = 4">
          </clocker>
          关闭订单
        </div>
        <div class="detail-title" v-else>您的订单{{detail.OrderStatus | orderStatusName}}</div>
      </div>
      <div class="detail-box">
        <group class="box" :gutter="0">
          <cell title="商品总价(元)：">
            <div class="theme-color">{{detail.Amount}}</div>
          </cell>
          <cell title="商品名称：" :value="detail.ProductName"></cell>
          <cell title="商品总数(个)：" :value="detail.ProductCount"></cell>
          <cell title="商品单价(元)：" :value="detail.ProductCost"></cell>
        </group>
        <group class="box" :gutter="0">
          <cell v-show="show1" title="支付方式：" :value="detail.PayType | payTypeName"></cell>
          <cell v-show="show1" title="支付流水号：" :value="detail.TransactionID"></cell>
          <cell title="订单号：" :value="detail.OrderNumber"></cell>
          <cell v-show="show1" title="支付时间：" :value="detail.PayDate | DATEFORMAT"></cell>
          <cell title="创建时间：" :value="detail.CreateTime | DATEFORMAT"></cell>
        </group>
        <div @click="goPay" class="btn-main main-bg main-shadow" v-if="isPay">去支付</div>
      </div>
    </div>
  </div>
</template>
<script>
import {Clocker} from 'vux'
export default {
  components: {Clocker},
  data() {
    return {
      id: this.$route.query.id
    }
  },
  computed: {
    show2() {
      return this.detail.OrderStatus == 4
    },
    show1() {
      return [1,2,3,5].indexOf(this.detail.OrderStatus) > -1
    },
    isPay() {
      return this.detail.OrderStatus == 0
    },
    detail() {
      return this.$store.state.OrderDetail
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$store.dispatch('getOrder', {
        id: this.id,
        type: 0
      })
    },
    async cancelOrder() {
      let {data} = await this.$http.post('ProductOrderIn/EditOrderMessage', {
        OrderID: this.id
      })
      if (data.Code == 1) {
        this.$vux.toast.text('取消成功')
        this.getDetail()
      } else {
        this.$vux.toast.text(data.Message)
      }
    },
    goPay() {
      this.$router.push({
        name: 'Pay',
        query: {
          id: this.id,
          type: 0
        }
      })
    }
  }
}
</script>
