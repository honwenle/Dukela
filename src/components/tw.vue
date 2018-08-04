<template>
  <group label-width="100px">
    <cell title="W(个)" value-align="left" :value="www"></cell>
    <cell title="T(个)" value-align="left" :value="ttt"></cell>
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
        ProductID: this.pid,
        PCount: this.num
      })
      if (data.Code == 1) {
        this.tprice = data.List[0]
        this.wrate = data.List[1]
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
      return (Math.floor(this.num * (this.pid ? this.wrate : this.WRate) * 100) / 100) || 0
    },
    ttt() {
      return (Math.floor(this.num * (this.pid ? this.tprice : this.TPrice) * 10000) / 10000) || 0
    }
  }
}
</script>
