<template>
  <div>
    <d-header>意见反馈</d-header>
    <x-textarea v-model="textContent" :rows="10" placeholder="请输入..." :max="500"></x-textarea>
    <div class="btn-main" @click="submitFeed">提交</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textContent: ''
    }
  },
  methods: {
    async submitFeed() {
      if (this.textContent == '') {
        this.$vux.toast.text('反馈不能为空')
        return false
      }
      let {data} = await this.$http.post('Feedback/Addinfo', {
        Content: this.textContent
      })
      if (data.Code == 1) {
        this.$vux.toast.text('提交成功')
        this.$router.back()
      }
    }
  }
}
</script>
