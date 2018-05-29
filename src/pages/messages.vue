<template>
  <div>
    <d-header :tran="true" :theme-color="true">我的消息</d-header>
    <list
      action-name="getUserMessage"
      :dataLength="dataList.length"
      :height="`-${67}px`"
    >
      <div class="message-wrap">
        <div class="item flex" v-for="item in dataList" :key="item.ID">
          <div class="avatar">
            <img :src="require('../assets/msg-a' + item.EventType + '.png')" class="img">
          </div>
          <div class="flex-1" style="padding: 0 8px 0 17px">
            <div class="message-box">
              <div class="row-padding">
                <div>{{item.EventTypeName}}</div>
                <div>{{item.CreateTime | DATEFORMAT}}</div>
                <div class="center">
                  <div>{{item.Title}}</div>
                  <div class="main-color">{{item.Content}}</div>
                </div>
                <div class="gray">订单号：xxxxxx</div>
              </div>
              <div class="row-padding2">立即查看</div>
            </div>
          </div>
        </div>
      </div>
    </list>
  </div>
</template>
<script>
export default {
  computed: {
    dataList() {
      return this.$store.state.UserMessage
    }
  }
}
</script>

<style scoped>
.message-wrap{
  padding: 20px 22px;
}
.img{
  width: 35px;
  height: 35px;
}
.message-box{
  background: #fff;
  position: relative;
  border-radius: 3px;
  font-size: 12px;
}
.message-box::before{
  content: '';
  position: absolute;
  border: 5px solid transparent;
  border-left: none;
  border-right: 6px solid #fff;
  top: 10px;
  left: -6px;
}
.row-padding{
  padding: 10px 8px;
}
.row-padding2{
  padding: 8px;
  border-top: 1px solid #eee;
}
.item{
  margin-bottom: 17px;
}
</style>
