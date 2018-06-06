<template>
  <div class="bg-fff center">
    <d-header>支付订单</d-header>
    <div style="padding: 30px 0">
      <font-icon :name="status ? 'dui': 'ku'" fontsize="60px" :color="status ? '#88c66e': '#bbb'"></font-icon>
      <div style="margin: 0 0 30px">
        {{title}}<br>{{content}}
      </div>
      <div class="btn-outline" @click="$router.push('my-order')">查看订单</div>
      <div class="btn-outline" @click="$router.push('my-goods')" v-if="type == 0">查看商品</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: this.$route.params.status,
      type: this.$route.params.type,
      title: this.$route.params.title,
      content: this.$route.params.content
    }
  }
}
</script>
