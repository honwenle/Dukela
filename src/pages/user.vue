<template>
  <div class="win-wrap">
    <d-header>个人信息</d-header>
    <group :gutter="0">
      <cell>
        <div class="avatar flex" slot="title">
          <img :src="dataInfo.Avator">
          <div>
            <div>{{hidePhone(dataInfo.Phone)}}</div>
            <div class="gray">ID:{{10000 + parseInt(dataInfo.ID)}}</div>
          </div>
        </div>
      </cell>
    </group>
    <group>
      <cell title="昵称" :value="dataInfo.FullName" @click.native="showChangeNick" is-link></cell>
      <cell title="年龄" :value="dataInfo.Age + '岁'"></cell>
      <cell title="性别" :value="genderList[+dataInfo.Sex]"></cell>
    </group>
    <group>
      <cell title="手机号更换" :value="hidePhone(dataInfo.Phone)" link="change-phone"></cell>
      <cell title="实名认证" value="还未进行实名认证" link="my-realname"></cell>
      <cell title="银行卡管理" value="未绑定" link="my-bankcard"></cell>
      <cell title="密码管理" link="my-password"></cell>
    </group>
    <group>
      <cell title="微信绑定" link="bind-wx"></cell>
    </group>
    <popup v-model="show1" height="100%">
      <popup-header
        left-text="取消"
        right-text="确定"
        title="6-20位字符"
        :show-bottom-border="false"
        @on-click-left="show1 = false"
        @on-click-right="submitNick">
      </popup-header>
      <group>
        <x-input v-model="nickName"></x-input>
      </group>
    </popup>
  </div>
</template>
<script>
import { Group, Cell, XInput, Popup, PopupHeader, Radio } from 'vux'
export default {
  components: {
    Group, Cell, XInput, Popup, PopupHeader, Radio
  },
  data() {
    return {
      show1: false,
      show2: false,
      genderList: ['女', '男'],
      nickName: ''
    }
  },
  computed: {
    dataInfo() {
      return this.$store.state.UserInfo
    }
  },
  methods: {
    hidePhone(tel) {
      return tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    },
    showChangeNick() {
      this.nickName = this.dataInfo.FullName
      this.show1 = true
    },
    async submitNick() {
      let {data} = await this.$http({
        method: 'post',
        url: '/User/EditFullName',
        data: {
          FullName: this.nickName
        }
      })
      if (data.Code == 1) {
        this.$vux.toast.text('修改成功')
        this.$store.dispatch('getUserInfo')
        this.show1 = false
      }
    }
  }
}
</script>
<style scoped>
.avatar img {
  width: 2.5em;
  border-radius: 50%;
  vertical-align: middle;
}
</style>
