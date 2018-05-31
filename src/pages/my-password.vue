<template>
  <div>
    <d-header>密码管理</d-header>
    <group :gutter="0">
      <cell title="登录密码" link="change-pwd"></cell>
      <cell title="交易密码" :value="dataInfo.isSetPwd ? '' : '暂无密码'" link="change-tran-pwd"></cell>
    </group>
  </div>
</template>
<script>
export default {
  computed: {
    dataInfo() {
      return this.$store.state.UserInfo
    }
  }
}
</script>
