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
      TPrice: this.price / this.TRate,
      WRate: this.w / 100
    }
  },
  methods: {
    async getPrice() {
      let {data} = await this.$http.post('User/Get_Number', {
        ProductID: this.pid
      })
      if (data.Code == 1) {
        this.TPrice = data.List[0]
        this.WRate = data.List[1]
      }
    }
  },
  mounted() {
    this.pid && this.getPrice()
  },
  computed: {
    TRate() {
      return this.$store.state.Config.TProportion
    },
    www() {
      return (this.num * this.WRate) || 0
    },
    ttt() {
      return (Math.floor(this.num * this.TPrice * 10000) / 10000) || 0
    }
  }
}
</script>
