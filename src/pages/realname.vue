<template>
  <div class="center">
    <d-header :pervent="true">实名认证</d-header>
    <div class="r-box flex">
      <div class="step flex-1" :class="step ? 'disable' : 'theme-color'">
        <font-icon name="radio"></font-icon>
        <div>证件上传</div>
      </div>
      <div class="step-line"></div>
      <div class="step flex-1" :class="step ? 'theme-color' : 'disable'">
        <font-icon name="radio"></font-icon>
        <div>人脸识别</div>
      </div>
    </div>
    <template v-if="step == 0">
      <div class="r-box">
        <div>请上传身份证正面</div>
        <div class="img-upload">
          <img src="../assets/realname1.png" alt="">
          <input type="file" id="idcard" @change="updateIdcard">
        </div>
      </div>
      <div class="r-box">
        <div style="padding-bottom: 15px">请确认您的信息</div>
        <div class="login-input">
          <font-icon name="key"></font-icon>
          <input v-model="name" type="password" placeholder="输入姓名">
        </div>
        <div class="login-input">
          <font-icon name="key"></font-icon>
          <input v-model="idcard" type="password" placeholder="输入身份证号">
        </div>
      </div>
      <div class="btn-full flex">
        <div class="flex-1 theme-color fff-bg" @click="nextStep">跳过</div>
        <div class="flex-1 theme-bg" @click="nextStep">下一步</div>
      </div>
    </template>
    <template v-else>
      <div class="r-box">
        <div>请上传个人正面照片</div>
        <div class="img-upload">
          <img src="../assets/realname1.png" alt="">
          <input type="file">
        </div>
        <div class="btn-full theme-bg" @click="nextStep">确定</div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      step: 0,
      name: '',
      idcard: ''
    }
  },
  computed: {
    isDisable() {
      return this.name == '' || this.idcard == ''
    }
  },
  methods: {
    updateIdcard(e) {
      let formdata = new FormData()
      formdata.append('file', e.target.files[0])
      this.$http.post({
        isUpload: true,
        url: 'Upload/BatchUpload',
        data: formdata
      }).then((res)=>{console.log(res)})
    },
    nextStep() {
      this.step ++
    }
  }
}
</script>

<style scoped lang="less">
@import '../styles/login.less';
.r-box{
  background: #fff;
  padding: 15px 0;
  margin-bottom: 15px;
}
.disable{
  color: #eee;
}
.disable .iconfont{
  color: #eee;
}
</style>
