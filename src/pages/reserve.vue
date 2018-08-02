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
      <x-input v-model="formData.ReserveUser" required title="入住人" placeholder="请填写姓名，需和身份证一致">
        <div slot="label" style="width: 100px">
          入住人
          <popover placement="right" style="display: inline-block">
            <div slot="content" class="popover-content">
              实际入住人需和填写的一致
            </div>
            <font-icon name="help" color="#fe5900"></font-icon>
          </popover>
        </div>
      </x-input>
      <x-input v-model="formData.ReserveUserIDCard" required placeholder="请填写身份证号码" :is-type="checkIdcard">
        <div slot="label" style="width: 100px">
          身份证
          <popover placement="right" style="display: inline-block">
            <div slot="content" class="popover-content">
              实际入住人需和填写的一致
            </div>
            <font-icon name="help" color="#fe5900"></font-icon>
          </popover>
        </div>
      </x-input>
      <x-input v-model="formData.ReserveTel" required type="tel" is-type="china-mobile" title="联系手机" placeholder="请填写手机号码"></x-input>
      <datetime v-model="formData.ReserveStartTime" valueTextAlign="left" required title="入住时间" placeholder="请选择" :start-date="new Date() | dateFormat('YYYY-MM-DD')"></datetime>
      <datetime v-model="formData.ReserveEndTime" valueTextAlign="left" required title="离开时间" placeholder="请选择" :start-date="formData.ReserveStartTime"></datetime>
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
    <submit-bar
      :price="amount"
      @onSubmit="clickOrder"
      button="确定预定">
      <span class="gray" v-if="deductInfo.id">
        已抵扣{{deductPrice}}元
      </span>
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
import { dateFormat } from 'vux'
import Deduct from '@/pages/deduct'
import Password from '@/components/password'
import checkGoods from '@/mixins/check-goods'
import {XInput, XNumber, Datetime, Popup, CheckIcon, Popover} from 'vux'
export default {
  mixins: [checkGoods],
  components: {XInput, XNumber, Datetime, Popup, CheckIcon, Deduct, Password, Popover},
  data() {
    return {
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
  filters: {
    dateFormat
  },
  computed: {
    total() {
      let seconds = new Date(this.formData.ReserveEndTime).getTime() - new Date(this.formData.ReserveStartTime).getTime()
      if (seconds <= 0) {
        this.$vux.toast.text('请选择至少一天')
        this.$nextTick(() => {
          this.formData.ReserveStartTime = ''
          this.formData.ReserveEndTime = ''
        })
      }
      let days = seconds/1000/60/60/24
      return Math.floor(this.detailData.RoomPrice * (days || 1) * 100)/100
    },
    deductPrice() {
      return Math.min(this.deductInfo.price, this.total)
    },
    count() {
      return this.deductInfo.count * this.deductPrice / this.deductInfo.price
    },
    amount() {
      return this.deductInfo.id ? (this.total - this.deductPrice) : this.total
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
    },
    UserInfo() {
      return this.$store.state.UserInfo
    }
  },
  mounted() {
    this.$store.dispatch('getUserProduct', {})
  },
  methods: {
    checkIdcard(val) {
      if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val)) {
        return {valid: true}
      } else {
        return {valid: false, msg: '请输入正确身份证号'}
      }
    },
    clickOrder() {
      let err = false
      this.$refs.form.$children.forEach(i => {
        err = !i.valid || err
      })
      if (err) {
        this.$vux.toast.text('请填写正确信息')
        return false
      }
      if (this.deductInfo.id) {
        this.checkDeduct()
      } else {
        this.submitOrder()
      }
    },
    checkDeduct() {
      if (!this.UserInfo.IsSellPassword) {
        this.$vux.confirm.show({
          title: '未设置交易密码',
          content: '是否设置交易密码',
          onConfirm: () => {
            this.$router.push({
              name: 'CheckPhone',
              params: {
                smsType: 5,
                nextPath: 'set-tran-pwd'
              }
            })
          }
        })
        return false
      }
      this.checkGoods(this.deductInfo.id, this.deductInfo.count, () => {
        this.isShowPassword = true
      })
    },
    async submitOrder(pwd = '') {
      let {data} = await this.$http.post('BeadhouseRoomReserveOrder/ReserveOrder', {
        OrderKey: pwd,
        BeadhouseID: this.VillaData.ID,
        RoomTypeID: this.detailData.ID,
        RoomPrice: this.detailData.RoomPrice,
        PayProductID: this.deductInfo.id,
        PayProductCount: this.count || '',
        PayProductAmount: this.deductPrice || '',
        ...this.formData
      })
      if (data.Code == 1) {
        if (this.amount > 0) {
          this.$router.replace({
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
          query: {
            id: oid,
            status: 1,
            type: 1,
            title: '预定成功！',
            content: '请按时办理入住！'
          }
        })
      } else {
        this.$vux.toast.text(data.Message)
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
