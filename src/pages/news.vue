<template>
  <div>
    <d-header :tran="true" :theme-color="true">资讯</d-header>
    <div class="news-wrap">
      <div class="fz16">{{detailData.Title}}</div>
      <div class="fz12">{{detailData.CreateTime | DATEFORMAT}}</div>
      <div class="img"><img :src="$imgUrl + detailData.ImgUrl" alt=""></div>
      <div v-html="detailData.Content"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.query.id,
      detailData: {}
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      let {data} = await this.$http.post('News/GetModel', {
        ID: this.id
      })
      if (data.Code == 1) {
        this.detailData = data.Model
      }
    }
  }
}
</script>
<style scoped>
.news-wrap{
  padding: 15px;
  text-align: center;
  background: #fff;
  min-height: calc(100vh - 66px);
}
</style>
