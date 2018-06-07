<template>
  <div class="win-wrap">
    <d-header>个人信息</d-header>
    <group :gutter="0">
      <cell>
        <div class="avatar flex" slot="title">
          <img :src="dataInfo.Avator">
          <div>
            <div>{{dataInfo.Phone | hidePhone}}</div>
            <div class="gray">ID:{{dataInfo.UserName}}</div>
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
      <cell title="手机号更换"
        :value="dataInfo.Phone | hidePhone"
        :link="{
          name: 'CheckPhone',
          params: {
            smsType: 6,
            nextPath: 'change-phone'
          }
        }">
      </cell>
      <cell title="实名认证"
        :value="dataInfo.IsCardID ? '已实名认证' : '还未进行实名认证'"
        :link="dataInfo.IsCardID ? 'my-realname' : 'realname'">
      </cell>
      <cell title="银行卡管理"
        :value="dataInfo.IsBank ? '已绑定' : '未绑定'"
        :link="{
          name: 'BindCard',
          params: {
            isBank: dataInfo.IsBank
          }
        }">
      </cell>
      <cell title="密码管理" link="my-password"></cell>
    </group>
    <group>
      <cell title="微信绑定"
        @click.native="wxAuth"
        is-link>
        <div v-if="dataInfo.WXOpenID">
          <font-icon name="weixin" color="#60b63c" fontsize="20px"></font-icon>
          {{dataInfo.FullName}}
        </div>
        <div v-else>未绑定</div>
      </cell>
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
import wxMixin from '@/mixins/wx'
import { Group, Cell, XInput, Popup, PopupHeader, Radio } from 'vux'
export default {
  mixins: [wxMixin],
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
    async afterWxAuth(ret) {
      let {data} = await this.$http.post('User/BindOpenID', {
        wXOpenID: ret.openid,
        fullName: ret.nickname,
        avator: ret.headimgurl
      })
      if (data.Code == 1) {
        this.$store.dispatch('getUserInfo')
        this.$vux.toast.text('绑定成功')
      } else {
        this.$vux.toast.text(data.Message)
      }
    },
    showChangeNick() {
      this.nickName = this.dataInfo.FullName
      this.show1 = true
    },
    async submitNick() {
      let {data} = await this.$http({
        method: 'post',
        url: '/User/EditFullNameByUserID',
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
  height: 2.5em;
  border-radius: 50%;
  vertical-align: middle;
}
.vux-popup-header{
  padding-top: 20px;
}
</style>
