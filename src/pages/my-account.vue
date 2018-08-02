<template>
  <div>
    <d-header>账户管理</d-header>
    <div class="tip">您还可以关联{{3 - accountList.length}}个账号。</div>
    <swipeout>
      <swipeout-item transition-mode="follow" v-for="item in accountList" :key="item.ID">
        <div slot="right-menu">
          <swipeout-button type="warn" @click.native="unbindAccount(item.ID)">删除</swipeout-button>
        </div>
        <div slot="content" class="flex flex-center space-between bb item-content" @click="switchAccount(item)">
          <div>{{item.UserName}}{{!item.MainUserID ? '(主)' : ''}}</div>
          <font-icon color="#3694FA" v-if="item.PassWord == UserKey" name="gou"></font-icon>
        </div>
      </swipeout-item>
      <swipeout-item v-if="accountList.length < 3">
        <div slot="content" class="flex flex-center item-content" @click="$router.push('bind-account')">
          <font-icon name="jia"></font-icon>
          绑定账号
        </div>
      </swipeout-item>
    </swipeout>
  </div>
</template>
<script>
// 主账号权限
export default {
  data() {
    return {
      accountList: []
    }
  },
  computed: {
    UserInfo() {
      return this.$store.state.UserInfo
    },
    UserKey() {
      return this.$store.state.UserKey
    }
  },
  mounted() {
    this.getAccountList()
  },
  methods: {
    switchAccount(item) {
      this.$store.commit('setUserKey', item.PassWord)
      this.$store.dispatch('getUserInfo')
    },
    async unbindAccount(id) {
      let {data} = await this.$http.post('User/RelieveBindUser', {
        UserID: id
      })
      if (data.Code == 1) {
        this.$vux.toast.text('解绑成功')
        this.getAccountList()
      } else {
        this.$vux.toast.text(data.Mesaage)
      }
    },
    async getAccountList() {
      let {data} = await this.$http.post('User/GetSubsidiaryUserList', {
        MainUserID: this.UserInfo.MainUserID || 0
      })
      if (data.Code == 1) {
        this.accountList = data.List
      }
    }
  }
}
</script>

<style scoped>
.tip {
  background: #fff;
  margin-bottom: 10px;
  padding: 5px 12px;
}
.item-content{
  height: 50px;
  padding: 0 12px;
}
</style>
