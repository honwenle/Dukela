<template>
  <div>
    <div class="theme-bg">
      <d-header :tran="true">入住预定</d-header>
      <div class="top-tran">
        <div>{{detailData.TypeName}}</div>
        <div>{{detailData.EquipmentContent}}</div>
      </div>
    </div>
    <group label-width="100px">
      <x-input title="房间数" value="1间" disabled></x-input>
      <x-input v-model="formData.ReserveUser" title="入住人" placeholder="请填写姓名，需和身份证一致"></x-input>
      <x-input v-model="formData.ReserveUserIDCard" title="身份证" placeholder="请填写身份证号码"></x-input>
      <x-input v-model="formData.ReserveTel" title="联系手机" placeholder="请填写手机号码"></x-input>
      <datetime v-model="formData.ReserveStartTime" title="入住时间" placeholder="请选择"></datetime>
      <datetime v-model="formData.ReserveEndTime" title="离开时间" placeholder="请选择"></datetime>
    </group>
    <group>
      <cell title="商品抵扣" link="deduct">
        <div v-if="goodsCount" class="deduct-tag">
          {{goodsCount}}个可用
        </div>
        <div v-else>无可用商品</div>
      </cell>
    </group>
    <div class="agreement">
      <input type="checkbox"> 已阅读《入住协议》
    </div>
    <div class="bottom-bar">
      <div class="flex">
        <div class="flex-2 text-right">
          <div class="price">{{amount}}</div>
          <span class="gray" v-if="deductInfo.id">已抵扣{{deductInfo.price * count}}元</span>
        </div>
        <div class="flex-1 btn-sm" @click="submitOrder">确定预定</div>
      </div>
    </div>
  </div>
</template>
<script>
import {XInput, XNumber, Datetime} from 'vux'
export default {
  components: {XInput, XNumber, Datetime},
  data() {
    return {
      formData: {
        ReserveUser: '',
        ReserveUserIDCard: '',
        ReserveTel: '',
        ReserveStartTime: '',
        ReserveEndTime: ''
      }
    }
  },
  computed: {
    total() {
      // TODO: 入住天数
      return this.detailData.RoomPrice * 1
    },
    count() {
      return Math.min(this.total / this.deductInfo.price, this.deductInfo.count)
    },
    amount() {
      return this.deductInfo.id ? Math.max(this.total - this.deductInfo.price * this.count, 0) : this.total
    },
    detailData() {
      return this.$store.state.RoomDetail
    },
    VillaData() {
      return this.$store.state.VillaDetail
    },
    goodsCount() {
      return this.$store.state.goodsCount
    },
    deductInfo() {
      return this.$store.state.deduct
    }
  },
  mounted() {
    this.$store.dispatch('getTRate')
    this.$store.dispatch('getUserProduct', {
      bid: this.VillaData.ID
    })
  },
  methods: {
    async submitOrder() {
      // TODO: 阅读协议
      // TODO: 存在抵扣 弹密码框
      let {data} = await this.$http.post('BeadhouseRoomReserveOrder/ReserveOrder', {
        BeadhouseID: this.VillaData.ID,
        RoomTypeID: this.detailData.ID,
        RoomPrice: this.detailData.RoomPrice,
        PayProductID: this.deductInfo.id,
        PayProductCount: this.count,
        PayProductAmount: this.deductInfo.price * this.count,
        ...this.formData
      })
      if (data.Code == 1) {
        if (this.amount > 0) {
          this.$router.push({
            name: 'Pay',
            query: {
              id: data.OrderID
            }
          })
        } else {
          this.ReservePay(data.OrderID)
        }
      } else {
        this.$vux.toast.text(data.Message)
      }
    },
    async ReservePay(oid) {
      let {data} = await this.$http.post('Pay/ReservePay', {
        OrderID: oid
      })
      if (data.Code == 1) {
        this.$router.push('result')
      }
    }
  }
}
</script>
<style scoped>
.top-tran{
  background: rgba(255, 255, 255, .3);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin: 0 12px;
  padding: 25px 20px 20px;
  color: #fff;
}
.agreement{
  padding: 15px;
}
.deduct-tag {
  background: linear-gradient(30deg, #cea35a, #e8d1a1);
  color: #fff;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 14px;
}
</style>
