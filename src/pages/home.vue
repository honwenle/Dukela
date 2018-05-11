<template>
  <div class="home-wrap fixed-bottom">
    <div class="list">
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
  </div>
</template>
<script>
export default {
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
        }
      ]
    }
  },
  methods: {
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
.home-wrap{
  background: url('../assets/home.jpg');
  background-size: 100%;
  background-repeat: no-repeat;
  position: absolute;
  width: 100%;
  min-height: 100%;
  background-color: #fff;
}
.list{
  padding: 180px 16px 0;
}
.blue{
  font-size: 18px;
}
</style>
