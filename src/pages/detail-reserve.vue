<template>
  <div class="page--detail">
    <d-header :tran="true" :theme-color="true">
      预定订单详情
      <div slot="right" v-if="isPay" @click="cancelOrder">取消订单</div>
    </d-header>
    <div class="detail">
      <div class="detail-top">
        <div class="detail-title" v-if="isPay">
          待支付，剩
          <clocker v-if="detail.CreateTime" :time="detail.CreateTime | PAYDATEFORMAT" format="%M分%S秒" @on-finish="$router.back()">
          </clocker>
          关闭订单
        </div>
        <div class="detail-title" v-else>您的订单{{detail.OrderStatus | reserveStatusName}}</div>
      </div>
      <div class="detail-box">
        <group v-if="show2" class="box" :gutter="0">
          <cell title="原因：" :value="detail.OrderMessage"></cell>
        </group>
        <group class="box" :gutter="0">
          <cell title="入住人：" :value="detail.ReserveUser"></cell>
          <cell title="联系电话：" :value="detail.ReserveTel"></cell>
          <cell title="总金额(元)：">
            <div class="theme-color">{{detail.Amount}}</div>
          </cell>
          <cell title="入住时间：" :value="detail.ReserveStartTime | DATEFORMAT"></cell>
          <cell title="离开时间：" :value="detail.ReserveEndTime | DATEFORMAT"></cell>
        </group>
        <group v-if="isDeduct" class="box" :gutter="0">
          <cell title="支付方式：">
            <div>{{detail.PayType | payTypeName}}{{detail.PayType ? '+商品抵扣' : ''}}</div>
          </cell>
          <cell title="现金金额(元)：" :value="detail.PayAmount"></cell>
          <cell title="商品名称：" :value="detail.PayProductName"></cell>
          <cell title="商品数量(个)：" :value="detail.PayProductCount"></cell>
        </group>
        <group class="box" :gutter="0">
          <cell v-if="show1 && !isDeduct" title="支付方式：" :value="detail.PayType | payTypeName"></cell>
          <cell v-if="show1" title="支付流水号：" :value="detail.TransactionID"></cell>
          <cell title="订单号：" :value="detail.OrderNumber"></cell>
          <cell title="支付时间：" :value="detail.PayDate | DATEFORMAT"></cell>
          <cell title="创建时间：" :value="detail.CreateTime | DATEFORMAT"></cell>
        </group>
        <div class="group box" v-if="detail.Room">
          <div class="cell flex space-between">
            <div>{{detail.Room.BeadhouseName}}</div>
            <div class="fz12" @click="$router.push('villaList')">查看<font-icon name="forward"></font-icon></div>
          </div>
          <div class="cell gray bb">{{detail.Room.Address}}</div>
          <div class="cell">{{detail.Room.TypeName}}</div>
          <div class="cell gray">
            单价：<div class="price">{{detail.Room.RoomPrice}}</div>
          </div>
          <div class="cell gray bb">{{detail.Room.RoomSize}}㎡ | {{detail.Room.TypeType}}</div>
          <div class="cell center">
            <a :href="`tel:${detail.Room.ContactTel}`" class="theme-color">
              <font-icon name="phone"></font-icon>
              {{detail.Room.ContactTel}}
            </a>
          </div>
        </div>
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
    isDeduct() {
      return !!this.detail.PayProductID
    },
    show2() {
      return this.detail.OrderStatus == 2
    },
    show1() {
      return [1,2,3].indexOf(this.detail.OrderStatus) > -1
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
        type: 1
      })
    },
    async cancelOrder() {
      let {data} = await this.$http.post('BeadhouseRoomReserveOrder/EditOrderMessage', {
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
          type: 1
        }
      })
    }
  }
}
</script>
