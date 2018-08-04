<template>
  <div class="page--messages">
    <d-header :tran="true" :theme-color="true">
      <tab v-model="tabIndex" default-color="#fff" active-color="#fff" bar-active-color="#fff">
        <tab-item selected>消息</tab-item>
        <tab-item>资讯</tab-item>
      </tab>
    </d-header>
    <list
      action-name="getUserMessage"
      :dataLength="dataList.length"
      :height="`-${67}`"
      v-show="tabIndex == 0"
    >
      <div class="message-wrap">
        <div class="item flex" v-for="item in dataList" :key="item.ID">
          <div class="avatar" :class="{'badge': !item.IsReader}">
            <img :src="msgImgList[typeImgMap[item.EventType]]" class="img">
          </div>
          <div class="flex-1" style="padding: 0 8px 0 17px">
            <div class="message-box" @click="goDetail(item.ID, item.KeyID, item.EventType)">
              <template v-if="item.EventType == 3">
                <div class="row-padding">
                  <div>{{item.Title}}</div>
                  <div>{{item.Content.Content}}</div>
                </div>
                <div class="row-padding2">{{item.CreateTime | DATEFORMAT}}</div>
              </template>
              <template v-else>
                <div class="row-padding">
                  <div>{{item.Title}}</div>
                  <div>{{item.CreateTime | DATEFORMAT}}</div>
                  <div class="center box-content">
                    <template v-if="item.EventType != 2 && item.EventType != 8">
                      <div>{{item.Content.ProductName}}</div>
                      <div class="main-color">
                        <span v-if="item.EventType == 5"><div>提现金额</div>￥：{{item.Content.Content}}</span>
                        <span v-else>{{item.Content.ProductCount}}份</span>
                      </div>
                    </template>
                    <template v-if="item.EventType == 2">
                      <div>{{item.Content.BeadhouseName}}</div>
                      <div class="gray">
                        入住时间：<span class="main-color">{{item.Content.ReserveStartTime | dateFormat('YYYY-MM-DD')}}</span>
                      </div>
                    </template>
                    <template v-if="item.EventType == 8">
                      <div>项目福利</div>
                      <div>
                        <span v-if="item.Content.Type != 1">{{item.Content.DividendProductName}}：</span>
                        <span class="main-color">{{item.Content.Content}}</span>
                      </div>
                    </template>
                  </div>
                  <div class="gray">订单号：{{item.Content.OrderNo}}</div>
                </div>
                <div class="row-padding2">立即查看</div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </list>
    <list
      action-name="getNews"
      :dataLength="newsList.length"
      :height="`-${67}`"
      v-show="tabIndex == 1"
    >
      <div class="flex flex-center cell fff-bg bb"
        v-for="item in newsList"
        :key="item.ID"
        @click="goNews(item.ID)">
        <div class="flex-2">
          <div class="fz16">{{item.Title}}</div>
          <div class="fz12">{{item.CreateTime}}</div>
        </div>
        <div class="flex-1">
          <img :src="$imgUrl + item.ImgUrl" alt="">
        </div>
      </div>
    </list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      apiName: '',
      storeName: '',
      tabIndex: 0,
      msgImgList: [
        require('../assets/msg-a1.png'),
        require('../assets/msg-a2.png'),
        require('../assets/msg-a3.png'),
        require('../assets/msg-a4.png'),
        require('../assets/msg-a5.png')
      ],
      typeImgMap: [0, 0, 1, 2, 3, 2, 4, 0, 0, 3]
    }
  },
  computed: {
    dataList() {
      return this.$store.state.UserMessage
    },
    newsList() {
      return this.$store.state.newsList
    }
  },
  methods: {
    goNews(id) {
      this.$router.push({
        path: 'news',
        query: {
          id
        }
      })
    },
    goDetail(id, kid, type) {
      this.$http.post('UserMessage/ReadMessage', {
        MessageID: id
      })
      if (type == 4 || type == 6 || type == 9) {
        this.apiName = 'UserProductStream'
        this.storeName = 'setRecordDetail'
      } else if (type == 5) {
        this.apiName = 'AccountBalance'
        this.storeName = 'setBalanceDetail'
      } else if (type == 8) {
        this.apiName = 'UserDividend'
        this.storeName = 'setRecordDetail'
      }
      this.apiName && this.getDetail(kid)
      this.$router.push({
        path: ['detail', 'detail-reserve', 'my-realname',
          'goods-record-detail', 'balance-detail', 'goods-record-detail',
          'promotion-record', 'welfare-detail', 'goods-record-detail'][type-1],
        query: {
          id: kid
        }
      })
    },
    async getDetail(id) {
      let {data} = await this.$http.post(this.apiName + '/GetModel', {
        KeyID: id
      })
      if (data.Code == 1) {
        this.$store.commit(this.storeName, data.Model)
      }
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
.box-content{
  font-size: 15px;
  margin: 16px 0;
}
.badge{
  position: relative;
}
.badge::after{
  content: '';
  position: absolute;
  background: #f74c31;
  top: -3px;
  right: -3px;
  padding: 5px;
  border-radius: 5px;
}
</style>
