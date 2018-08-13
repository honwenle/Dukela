<template>
  <div>
    <d-header :tran="true" :theme-color="true">
      资讯
      <span slot="right" @click="clickShare">
        <font-icon name="fenxiang" fontsize="20px"></font-icon>
      </span>
    </d-header>
    <div class="news-wrap">
      <div class="fz16">{{detailData.Title}}</div>
      <div class="gray fz12" style="margin: 10px;">{{detailData.CreateTime | DATEFORMAT}}</div>
      <div class="img" style="margin: 10px;"><img :src="$imgUrl + detailData.ImgUrl" alt=""></div>
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
    clickShare() {
      try {
        var sharedModule = api.require('shareAction')
        sharedModule.share({
            text: this.detailData.Title,
            type: 'url',
            path: location.href
        })
      } catch(e) {
        console.log(e)
      }
    },
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
