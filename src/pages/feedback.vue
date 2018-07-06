<template>
  <div>
    <d-header>意见反馈</d-header>
    <div class="comment-box">
      <textarea rows="10">请输入...</textarea>
    </div>
    <div class="btn-main" @click="submitFeed">提交</div>
  </div>
</template>
<script>
export default {
  methods: {
    submitFeed() {
      this.$vux.toast.text('反馈接口还未完成')
    }
  }
}
</script>

<style scoped>
.comment-box {
  padding: 15px;
}
.comment-box textarea {
  width: 100%;
  border: none;
  padding: 15px;
  box-sizing: border-box;
}
</style>
