<template>
  <div class="bg-fff center page--result">
    <d-header>支付订单</d-header>
    <div style="padding: 30px 15%">
      <font-icon :name="status ? 'dui': 'ku'" fontsize="60px" :color="status ? '#88c66e': '#bbb'"></font-icon>
      <div style="margin: 0 0 30px">
        {{title}}<br>{{content}}
      </div>
      <div class="flex space-between">
        <div class="btn-outline" @click="$router.push({
          path: 'my-order',
          query: {
            type: type
          }
        })">查看订单</div>
        <div class="btn-outline" @click="$router.go(-3-type)">返回首页</div>
      </div>
      <div v-if="type == 0" class="btn-main w100p" @click="$router.push('my-goods')">查看商品</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: this.$route.query.status == 1,
      type: this.$route.query.type,
      title: this.$route.query.title,
      content: this.$route.query.content
    }
  }
}
</script>
<style scoped>
.btn-outline{
  width: 45%;
  box-sizing: border-box;
}
</style>
