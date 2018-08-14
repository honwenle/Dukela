export default {
  methods: {
    async checkGoods(pid, count, cb) {
      let {data} = await this.$http.post('BeadhouseRoomReserveOrder/GetCheckOrder', {
        ProductID: pid
      })
      if (data.Code == 1) {
        if (data.UseProductCount < count) {
          this.$vux.confirm.show({
            title: '操作提示',
            content: '你的订单关联到未生效商品，如继续购买，则商品默认生效',
            onConfirm: cb
          })
        } else {
          cb()
        }
      } else {
        this.$vux.toast.text(data.Message)
      }
    }
  }
}