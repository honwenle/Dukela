<template>
  <div>
    <x-header>我的消息</x-header>
    <div class="message-wrap">
      <div class="item flex" v-for="i in 3" :key="i">
        <div class="avatar">
          <img src="https://media-image1.baydn.com/avatar%2Fmedia_store%2F16a83bca5aac8f45ca8af8bb8e8a51ee.png@128w_128h" class="img">
        </div>
        <div class="flex-1" style="padding: 0 8px 0 17px">
          <div class="message-box">
            <div class="row-padding">
              <div>商品购买成功！</div>
              <div>2018-04-18</div>
              <div>xxx{{i}}</div>
              <div class="gray">订单号：1111111111</div>
            </div>
            <div class="row-padding2">立即查看</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
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
