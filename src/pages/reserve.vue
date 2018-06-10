<template>
  <div>
    <div class="theme-bg">
      <d-header :tran="true">入住预定</d-header>
      <div class="top-tran">
        <div class="fz16">{{detailData.TypeName}}</div>
        <div class="fz13" style="margin-top: 8px;">{{detailData.EquipmentContent}}</div>
      </div>
    </div>
    <group label-width="100px" ref="form">
      <x-input title="房间数" value="1间" disabled></x-input>
      <x-input v-model="formData.ReserveUser" required title="入住人" placeholder="请填写姓名，需和身份证一致"></x-input>
      <x-input v-model="formData.ReserveUserIDCard" required title="身份证" placeholder="请填写身份证号码"></x-input>
      <x-input v-model="formData.ReserveTel" required type="tel" is-type="china-mobile" title="联系手机" placeholder="请填写手机号码"></x-input>
      <datetime v-model="formData.ReserveStartTime" format="YYYY-MM-DD HH:mm" valueTextAlign="left" required title="入住时间" placeholder="请选择"></datetime>
      <datetime v-model="formData.ReserveEndTime" valueTextAlign="left" required title="离开时间" placeholder="请选择"></datetime>
    </group>
    <group>
      <cell title="商品抵扣" is-link @click.native="show1 = true">
        <div v-if="deductInfo.id">
          {{deductInfo.name}}
        </div>
        <template v-else>
          <div v-if="goodsCount" class="deduct-tag">
            {{goodsCount}}个可用
          </div>
          <div v-else>无可用商品</div>
        </template>
      </cell>
    </group>
    <div class="agreement">
      <check-icon :value.sync="readed" type="plain">
        已阅读《入住协议》
      </check-icon>
    </div>
    <submit-bar
      :price="amount"
      @onSubmit="clickOrder"
      button="确定预定">
      <span class="gray" v-if="deductInfo.id">已抵扣{{deductInfo.price * count}}元</span>
    </submit-bar>
    <popup v-model="show1" height="100%">
      <deduct @selectDeduct="show1 = false"></deduct>
    </popup>
    <popup v-model="isShowPassword">
      <password ref="pwd" @finishpwd="submitOrder"></password>
    </popup>
  </div>
</template>
<script>
import Deduct from '@/pages/deduct'
import Password from '@/components/password'
import {XInput, XNumber, Datetime, Popup, CheckIcon} from 'vux'
export default {
  components: {XInput, XNumber, Datetime, Popup, CheckIcon, Deduct, Password},
  data() {
    return {
      readed: false,
      show1: false,
      isShowPassword: false,
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
      let seconds = new Date(this.formData.ReserveEndTime).getTime() - new Date(this.formData.ReserveStartTime).getTime()
      if (seconds <= 0) {
        this.$nextTick(() => {
          this.formData.ReserveStartTime = ''
          this.formData.ReserveEndTime = ''
        })
      }
      let days = seconds/1000/60/60/24
      return Math.floor(this.detailData.RoomPrice * (days || 1) * 100)/100
    },
    count() {
      return Math.min(this.total / this.deductInfo.price, this.deductInfo.count)
    },
    amount() {
      return this.deductInfo.id ? Math.max(this.total - Math.floor(this.deductInfo.price * this.count *100)/100, 0) : this.total
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
    clickOrder() {
      let err = false
      this.$refs.form.$children.forEach(i => {
        err = !i.valid || err
      })
      if (err) {
        this.$vux.toast.text('请填写正确信息')
        return false
      }
      if (!this.readed) {
        this.$vux.toast.text('请先阅读入住协议')
        return false
      }
      if (this.deductInfo.id) {
        this.isShowPassword = true
      } else {
        this.submitOrder()
      }
    },
    async submitOrder(pwd = '') {
      let {data} = await this.$http.post('BeadhouseRoomReserveOrder/ReserveOrder', {
        OrderKey: pwd,
        BeadhouseID: this.VillaData.ID,
        RoomTypeID: this.detailData.ID,
        RoomPrice: this.detailData.RoomPrice,
        PayProductID: this.deductInfo.id,
        PayProductCount: this.count || '',
        PayProductAmount: this.deductInfo.price * this.count || '',
        ...this.formData
      })
      if (data.Code == 1) {
        if (this.amount > 0) {
          this.$router.push({
            name: 'Pay',
            query: {
              id: data.OrderID,
              type: 1
            }
          })
        } else {
          this.ReservePay(data.OrderID)
        }
      } else {
        this.$vux.toast.text(data.Message)
        this.$refs.pwd.clearPwd()
      }
    },
    async ReservePay(oid) {
      let {data} = await this.$http.post('Pay/ReservePay', {
        OrderID: oid
      })
      if (data.Code == 1) {
        this.$router.push({
          name: 'Result',
          params: {
            status: true,
            type: 1,
            title: '预定成功！',
            content: '请按时办理入住！'
          }
        })
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
