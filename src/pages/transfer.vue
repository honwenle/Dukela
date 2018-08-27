<template>
  <div>
    <d-header :tran="true" :theme-color="true">转让</d-header>
    <group gutter="0">
      <cell :title="transferGoods.ProductName" :inline-desc="`持有${transferGoods.ProductCount}个 可转让${transferGoods.TransferCount}个`"></cell>
    </group>
    <group label-width="100px">
      <x-number fillable title="数量(个)" align="left" v-model="ProductCount" :min="1" :max="+transferGoods.TransferCount"></x-number>
      <x-input title="价格(元)" :inline-desc="`指导价格${transferGoods.GuidanceCost}元`" :placeholder="`可设置区间为${minPrice}-${maxPrice}`" v-model="ProductAmount"></x-input>
    </group>
    <tw :num="ProductCount" :pid="transferGoods.ProductID"></tw>
    <div class="timeout-bar" v-if="timeout">
      {{timeout}}
    </div>
    <submit-bar
      v-else
      :price="total"
      @onSubmit="clickSubmit"
      button="确定转让">
    </submit-bar>
    <popup v-model="isShowPassword">
      <password ref="pwd" @finishpwd="submitTransfer"></password>
    </popup>
    <protocol title="转让协议" v-model="isShowPro" @agree="clickAgree">
      <!-- <p>XXX: 协议内容</p> -->
    </protocol>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ProductCount: 1,
      ProductAmount: '',
      isShowPassword: false,
      isShowPro: false,
      timeout: ''
    }
  },
  watch: {
    ProductCount(newValue, old) {
      this.ProductCount = Math.floor(newValue)
    }
  },
  mounted() {
    this.checkTime()
  },
  computed: {
    minPrice() {
      return this.transferGoods.ProductCost - this.transferGoods.ProductCost * this.Config.ProductCostRate / 100
    },
    maxPrice() {
      return Number(this.transferGoods.ProductCost) + this.transferGoods.ProductCost * this.Config.ProductCostRate2 / 100
    },
    total() {
      return this.ProductAmount * this.ProductCount
    },
    transferGoods() {
      return this.$store.state.transferGoods
    },
    Config() {
      return this.$store.state.Config
    }
  },
  methods: {
    async checkTime() {
      let {data} = await this.$http.post('User/CheckTransfer')
      if (data.Code == 0) {
        let now = new Date(data.Time.match(/\d{13}/))
        now = now.getHours()
        if (now < data.StartHours) {
          this.timeout = `今日${data.StartHours}点开始`
        } else if (now >= data.EndHours) {
          this.timeout = `今日已截止，明日${data.StartHours}点开始`
        }
      } else {
        this.timeout = ''
      }
    },
    clickAgree() {
      this.isShowPro = false
      this.isShowPassword = true
    },
    clickSubmit() {
      if (this.ProductAmount < this.minPrice || this.ProductAmount > this.maxPrice) {
        this.$vux.toast.text('请按要求填写价格')
        return false
      }
      if (localStorage.getItem('protocol_trans')) {
        this.isShowPassword = true
      } else {
        localStorage.setItem('protocol_trans', 1)
        this.isShowPro = true
      }
    },
    async submitTransfer(pwd) {
      let {data} = await this.$http.post('User/TransferProduct', {
        ProductAmount: this.ProductAmount,
        UserProductID: this.transferGoods.ID,
        TransferCount: this.ProductCount,
        SellPassword: pwd
      })
      if (data.Code == 1) {
        this.isShowPassword = false
        this.$vux.toast.text('提交成功')
        this.$router.back()
      } else {
        this.$vux.toast.text(data.Message)
        this.$refs.pwd.clearPwd()
      }
    }
  }
}
</script>
<style scoped>
.timeout-bar{
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #AFAFAF;
  color: #fff;
}
</style>
