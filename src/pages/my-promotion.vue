<template>
  <div>
    <div class="wave-top">
      <d-header :tran="true">
        我的推广
      </d-header>
      <div class="wave-top-tran flex flex-center space-between">
        <div>
          <div class="fz25">{{totalData.OrderAmount}}</div>
          <div class="gray">我的推广业绩(元)</div>
        </div>
        <div>
          <div class="fz25">{{totalData.ZAchievement}}</div>
          <div class="gray">累计推广收益(元)</div>
        </div>
      </div>
    </div>
    <group>
      <cell title="我的推广码" class="copyable" :value="UserInfo.InvitationCode"></cell>
      <cell title="收益明细" link="promotion-record"></cell>
    </group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      totalData: {}
    }
  },
  computed: {
    UserInfo() {
      return this.$store.state.UserInfo
    }
  },
  mounted() {
    this.getTotal()
  },
  methods: {
    async getTotal() {
      let {data} = await this.$http.post('User/GetAgentTotal')
      if (data.Code == 1) {
        this.totalData = JSON.parse(data.List)[0]
      }
    }
  }
}
</script>
