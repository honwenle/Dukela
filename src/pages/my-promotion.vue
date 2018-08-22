<template>
  <div>
    <div class="wave-top">
      <d-header :tran="true">
        我的推广
        <span slot="right" @click="clickShare">
          <font-icon name="fenxiang" fontsize="20px"></font-icon>
        </span>
      </d-header>
      <div class="wave-top-tran flex flex-center space-between">
        <div>
          <div class="fz25">{{totalData.OrderAmount}}</div>
          <div class="gray">我的推广业绩(元)</div>
        </div>
        <div>
          <div class="fz25">{{totalData.AppZAchievement}}</div>
          <div class="gray">累计推广收益(元)</div>
        </div>
      </div>
    </div>
    <group>
      <cell title="我的推广码" class="copyable" is-link :value="UserInfo.InvitationCode" @click.native="isShowQR = true"></cell>
      <cell title="收益明细" link="promotion-record"></cell>
    </group>
    <x-dialog class="qr-dialog" v-model="isShowQR" hide-on-blur>
      <qrcode class="qrcode" v-if="UserInfo.InvitationCode" :value="shareHost + UserInfo.InvitationCode"></qrcode>
      <div class="btn-main" @click="clickShare">我要分享</div>
    </x-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      totalData: {},
      isShowQR: false,
      shareHost: 'http://weixin.doukela.com/install.html?icode='
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
    clickShare() {
      try {
        var sharedModule = api.require('shareAction')
        sharedModule.share({
            text: '快来下载都可拉吧！',
            type: 'url',
            path: this.shareHost + this.UserInfo.InvitationCode
        })
      } catch(e) {
        console.log(e)
      }
    },
    async getTotal() {
      let {data} = await this.$http.post('User/GetAgentTotal')
      if (data.Code == 1) {
        this.totalData = JSON.parse(data.List)[0]
      }
    }
  }
}
</script>
<style>
.qr-dialog .weui-dialog{
  background: transparent;
}
.qrcode {
  padding: 10px;
  display: inline-block;
  background: #fff;
  border-radius: 5px;
}
</style>
