<template>
  <div>
    <div class="top">
      <div class="realname-top-round">
        <font-icon name="wo" fontsize="40px"></font-icon>
      </div>
      <div>您已通过实名认证</div>
    </div>
    <group :gutter="0">
      <cell title="姓名"><span class="blue">{{infoData.name}}</span></cell>
      <cell title="证件"><span class="blue">{{infoData.idcard}}</span></cell>
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
  data() {
    return {
      infoData: {
        name: '童盈盈',
        idcard: '3****************6'
      }
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
