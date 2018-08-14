<template>
  <group label-width="100px">
    <cell title="W(个)" value-align="left" :value="pid ? www : _www"></cell>
    <cell title="T(个)" value-align="left" :value="pid ? ttt : _ttt"></cell>
  </group>
</template>
<script>
export default {
  props: ['num', 'w', 'price', 'pid'],
  data() {
    return {
      tprice: 0,
      wrate: 0
    }
  },
  methods: {
    async getPrice() {
      let {data} = await this.$http.post('User/Get_Number', {
        ProductID: this.pid
      })
      if (data.Code == 1) {
        this.pcount = data.List[0]
        this.tprice = data.List[1]
        this.wrate = data.List[2]
      }
    }
  },
  mounted() {
    this.pid && this.getPrice()
  },
  computed: {
    TPrice() {
      return this.price / this.TRate
    },
    WRate() {
      return this.w / 100
    },
    TRate() {
      return this.$store.state.Config.TProportion
    },
    www() {
      return this.wrate * this.num / this.pcount
    },
    _www() {
      return (Math.floor(this.num * this.WRate * 100) / 100) || 0
    },
    ttt() {
      return this.tprice * this.num / this.pcount
    },
    _ttt() {
      return (Math.floor(this.num * this.TPrice * 10000) / 10000) || 0
    }
  }
}
</script>
