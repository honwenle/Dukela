<template>
  <div>
    <d-header>商品买入</d-header>
    <group label-width="100px">
      <cell title="商品名" value-align="left" :value="detailData.ProductName"></cell>
      <cell title="单价" value-align="left">
        <div class="theme-color">{{detailData.ProductCost}}元</div>
      </cell>
    </group>
    <group label-width="100px">
      <x-input v-model="num" :is-type="checkNum" @on-change="numParseInt" title="数量" type="number" :placeholder="this.detailData.SellLimitCount+'份起售，最多购入10000元'"></x-input>
    </group>
    <div class="bottom-bar">
      <div class="flex">
        <div class="flex-2 text-right theme-color fz14">总价<div class="price">{{amount}}</div></div>
        <div class="flex-1 btn-sm" @click="submitOrder">确定买入</div>
      </div>
    </div>
  </div>
</template>
<script>
import {Group, Cell, XInput} from 'vux'
export default {
  components: {
    Group, Cell, XInput
  },
  data() {
    return {
      num: ''
    }
  },
  computed: {
    amount() {
      return (this.detailData.ProductCost || 0) * (parseInt(this.num) || 0)
    },
    detailData() {
      return this.$store.state.ProductDetail
    }
  },
  methods: {
    numParseInt(val) {
      this.$nextTick(()=> {
        this.num = parseInt(this.num)
      })
    },
    checkNum(val) {
      if (val < this.detailData.SellLimitCount) {
        return {
          valid: false,
          msg: this.detailData.SellLimitCount + '份起售'
        }
      } else {
        return {
          valid: true
        }
      }
    },
    async submitOrder() {
      let check = this.checkNum(this.num)
      if(check.valid) {
        let data = await this.$store.dispatch('buyProduct', {
          ProductID: this.detailData.ID,
          ProductName: this.detailData.ProductName,
          ProductCost: this.detailData.ProductCost,
          ProductCount: this.num
        })
        if (data.Code == 1) {
          this.$router.push({
            name: 'Pay',
            query: {
              id: data.OrderID,
              offline: 1
            }
          })
        } else {
          this.$vux.toast.text(data.Message)
        }
      } else {
        this.$vux.toast.text(check.msg)
        return false
      }
    }
  }
}
</script>
<style scoped>
.top-tip{
  background: #f4f9fe;
  text-align: center;
  padding: 12px;
}
</style>
