<template>
  <div class="bg-fff fixed-bottom">
    <div class="top">
      <img src="../assets/banenr.png" alt="">
    </div>
    <div class="list">
      <scroller ref="vuxscroller" lock-x use-pulldown @on-pulldown-loading="loadData" height="-230px">
        <div style="padding: 0 16px;">
          <div class="home-item" v-for="item in dataList" :key="item.id">
            <div class="flex space-between">
              <div>{{item.name}}</div>
              <div>
                <span class="btn-sm" @click="goGoods(item.id)">立即抢购</span>
              </div>
            </div>
            <div class="flex space-between">
              <div class="blue">{{item.price}}元/小时</div>
              <div>剩余{{item.surplus}}份</div>
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
  height: calc(100vh - 230px);
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
</style>
