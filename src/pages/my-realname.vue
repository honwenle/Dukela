<template>
  <div>
    <d-header>实名认证</d-header>
    <div class="top">
      <div class="realname-top-round">
        <font-icon name="wo" fontsize="40px"></font-icon>
      </div>
      <div>您已通过实名认证</div>
    </div>
    <group :gutter="0">
      <cell title="姓名"><span class="theme-color">{{dataInfo.RealName}}</span></cell>
      <cell title="证件"><span class="theme-color">{{dataInfo.CardID}}</span></cell>
      <cell title="性别"><span class="theme-color">{{['女', '男'][+dataInfo.Sex]}}</span></cell>
      <cell title="年龄"><span class="theme-color">{{dataInfo.Age}}</span></cell>
    </group>
    <div class="btn-main" @click="$router.push({name: 'Realname'})">去认证</div>
  </div>
</template>
<script>
import { Group, Cell } from 'vux'
export default {
  components: {
    Group, Cell
  },
  computed: {
    dataInfo() {
      return this.$store.state.UserInfo
    }
  }
}
</script>
<style scoped>
.top{
  background: linear-gradient(30deg, #3668fb, #837cfd);
  text-align: center;
  color: #fff;
  padding: 32px 0;
}
.realname-top-round{
  background: #fff;
  height: 50px;
  width: 50px;
  display: inline-block;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
}
.realname-top-round .iconfont{
  color: #6aa6ff;
}
.unrealname .realname-top-round .iconfont{
  color: #c0c0c0;
}
.unrealname.top{
  background: linear-gradient(30deg, #c0c0c0, #dadada);
}
</style>
