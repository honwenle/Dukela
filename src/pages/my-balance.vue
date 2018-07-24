<template>
  <div>
    <div class="wave-top">
      <d-header :tran="true">
        账户余额
      </d-header>
      <div class="wave-top-tran flex flex-center space-between">
        <div>
          <div class="fz25">{{UserInfo.AccountBalance}}</div>
          <div class="gray">账户余额(元)</div>
        </div>
        <div>
          <span class="btn-inline" @click="clickWithdraw">提现</span>
        </div>
      </div>
    </div>
    <div class="goods-list">
      <list
        action-name="getBalance"
        :dataLength="dataList.length"
        :height="`-${228}`"
      >
        <div
          v-for="item in dataList"
          :key="item.ID"
          class="bb flex flex-center list-item"
          :class="item.AType == 1 ? 'record-income' : 'record-outcome'"
          @click="goDetail(item.ID)">
          <div class="flex-1">
            <div class="round-text"></div>
          </div>
          <div class="flex-5">
            <div class="flex space-between fz16">
              <div>{{item.SourceType | balanceTypeName}}</div>
              <div class="cost-color cost-num">{{item.Amount}}</div>
            </div>
            <div class="flex space-between">
              <div class="gray">{{item.CreateTime}}</div>
              <div class="gray">余额：{{item.AccountBalance}}</div>
            </div>
          </div>
        </div>
      </list>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    dataList() {
      return this.$store.state.Balance
    },
    UserInfo() {
      return this.$store.state.UserInfo
    }
  },
  methods: {
    clickWithdraw() {
      if (this.UserInfo.IsBank) {
        this.$router.push('withdraw')
      } else {
        this.$vux.confirm.show({
          title: '未绑卡！',
          content: '请绑定银行卡',
          confirmText: '去绑定',
          onConfirm: () => {
            this.$router.push('bindcard')
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.goods-list{
  padding: 0 12px;
}
.list-item{
  background: #fff;
  padding: 18px 14px;
  margin-bottom: 15px;
  border-radius: 5px;
}
</style>
