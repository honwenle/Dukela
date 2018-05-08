<template>
  <div>
    <group :gutter="0">
      <cell>
        <div class="avatar" slot="title">
          <img :src="userInfo.Avator">
          <span>{{userInfo.FullName}}</span>
        </div>
      </cell>
    </group>
    <group>
      <cell title="昵称" :value="userInfo.FullName" @click.native="showChangeNick" is-link></cell>
      <cell title="性别" :value="genderList[+userInfo.Sex]"></cell>
      <cell title="手机号" :value="userInfo.Phone"></cell>
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
      userInfo: {},
      nickName: ''
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    showChangeNick() {
      this.nickName = this.userInfo.FullName
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
        this.getInfo()
        this.show1 = false
      }
    },
    async getInfo() {
      let {data} = await this.$http({
        method: 'post',
        url: '/User/GetUserModel'
      })
      if (data.Code == 1) {
        this.userInfo = data.Model
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
