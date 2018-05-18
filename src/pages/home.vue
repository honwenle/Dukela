<template>
  <div class="bg-fff fixed-bottom">
    <div class="top">
      <img src="../assets/banenr.png" alt="">
    </div>
    <div class="list">
      <scroller
        ref="vuxscroller"
        lock-x
        use-pulldown
        @on-pulldown-loading="loadData"
        height="-230px"
        :pulldown-config="{downContent: '下拉刷新', upContent: '释放后更新', loadingContent: '加载中'}">
        <div style="padding: 0 16px;">
          <div class="home-item" v-for="item in dataList" :key="item.id">
            <div class="bb" style="padding: 6px 15px">
              <font-icon name="home1" color="#6e9cff"></font-icon>
              {{item.name}}
            </div>
            <div class="flex flex-center" style="padding: 10px 0 7px 15px">
              <div class="flex-1">
                <div class="gray">价格（元/小时）</div>
                <div class="big-num">3.00</div>
              </div>
              <div class="flex-1 border-left">
                <div class="gray"><font-icon name="rmb"></font-icon>已出售<span class="orange">1000份</span></div>
                <div class="gray"><font-icon name="kucun"></font-icon>剩余100000份</div>
              </div>
              <div class="flex-1 center">
                <div class="btn-outline" @click="goGoods(item.id)">立即抢购</div>
              </div>
            </div>
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>
<script>
import { Scroller } from 'vux'
export default {
  components: {
    Scroller
  },
  data() {
    return {
      dataList: [
        {
          id: 1,
          name: '乔顿山庄30㎡',
          price: 1.5,
          surplus: 10000
        },
        {
          id: 2,
          name: '乔顿山庄30㎡',
          price: 1.5,
          surplus: 10000
        },
        {
          id: 3,
          name: '乔顿山庄30㎡',
          price: 1.5,
          surplus: 10000
        },
        {
          id: 4,
          name: '乔顿山庄30㎡',
          price: 1.5,
          surplus: 10000
        },
        {
          id: 5,
          name: '乔顿山庄30㎡',
          price: 1.5,
          surplus: 10000
        },
        {
          id: 6,
          name: '乔顿山庄30㎡',
          price: 1.5,
          surplus: 10000
        },
        {
          id: 7,
          name: '乔顿山庄30㎡',
          price: 1.5,
          surplus: 10000
        },
        {
          id: 8,
          name: '乔顿山庄30㎡',
          price: 1.5,
          surplus: 10000
        }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.vuxscroller.reset()
    })
  },
  methods: {
    loadData() {
      setTimeout(() => {
        this.dataList = this.dataList.concat({
          id: Math.random(),
          name: '乔顿山庄30㎡',
          price: 1.5,
          surplus: 10000
        }, {
          id: Math.random(),
          name: '乔顿山庄30㎡',
          price: 1.5,
          surplus: 10000
        })
        this.$refs.vuxscroller.donePulldown()
        this.$nextTick(() => {
          this.$refs.vuxscroller.reset()
        })
      }, 500);
    },
    goGoods(id) {
      this.$router.push({
        name: 'Goods',
        query: {
          id: id
        }
      })
    }
  }
}
</script>
<style scoped>
.list{
  top: 180px;
  height: calc(100vh - 180px);
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  overflow: hidden;
}
.blue{
  font-size: 18px;
}
.top{
  height: 180px;
}
.top img{
  width: 100%;
  height: 100%;
}
.home-item{
  padding: 5px;
  font-size: 12px;
  white-space: nowrap;
}
.big-num{
  font-size: 35px;
  color: #ff5400;
}
.border-left{
  padding-left: 18px;
  border-left: 1px solid #eee;
}
.iconfont{
  margin-right: 10px;
}
</style>
