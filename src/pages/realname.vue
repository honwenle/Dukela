<template>
  <div class="center fixed-bottom">
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
          <img :src="img1" alt="">
          <input type="file" @change="updateIdcard">
        </div>
      </div>
      <div class="r-box">
        <div style="padding-bottom: 15px">请确认您的信息</div>
        <div class="login-input">
          <font-icon name="key"></font-icon>
          <input v-model="name" disabled placeholder="姓名">
        </div>
        <div class="login-input">
          <font-icon name="key"></font-icon>
          <input v-model="idcard" disabled placeholder="身份证号">
        </div>
      </div>
      <div class="btn-full flex">
        <div class="flex-1 theme-color fff-bg" @click="$router.go(-2)">跳过</div>
        <div class="flex-1 theme-bg" @click="nextStep">下一步</div>
      </div>
    </template>
    <template v-else>
      <div class="r-box">
        <div>请上传个人正面照片</div>
        <div class="img-upload">
          <img :src="img2" alt="">
          <input type="file" @change="updateIdcard">
        </div>
        <div class="btn-full theme-bg" @click="submitCheck">确定</div>
      </div>
    </template>
    <re-confirm
      :show="show1"
      go-name="set-tran-pwd"
      button="设置交易密码"
      title="实名认证成功！"
      content="设置交易密码后方可购买！"/>
  </div>
</template>
<script>
import ReConfirm from '@/components/re-confirm'
export default {
  components: {
    ReConfirm
  },
  data() {
    return {
      step: 0,
      name: '',
      idcard: '',
      img1: require('../assets/realname1.png'),
      img2: require('../assets/realname1.png'),
      imgPath: '',
      show1: false,
      dontNoticeSetPwd: this.$route.params.noNotice
    }
  },
  computed: {
    isDisable() {
      return this.name == '' || this.idcard == ''
    },
    isSetPwd() {
      return this.$store.state.UserInfo.IsSellPassword
    }
  },
  methods: {
    updateIdcard(e) {
      let formdata = new FormData()
      let reader = new FileReader()
      reader.onload = (e) => {
        if (this.step == 0) {
          this.img1 = e.target.result
        } else if (this.step == 1) {
          this.img2 = e.target.result
        }
      }
      let photo = e.target.files[0]
      reader.readAsDataURL(photo)
      formdata.append('file', photo)
      this.$vux.loading.show({
        text: '正在上传'
      })
      this.$http({
        method: 'post',
        isUpload: true,
        url: 'Upload/BatchUpload',
        data: formdata
      }).then(({data}) => {
        this.$vux.loading.hide()
        if (data.Code == 1) {
          this.imgPath = data.FileList
          this.step == 0 && this.submitCheck()
        } else {
          this.$vux.alert.show({
            content: data.Message
          })
        }
      }).catch(() => {
        this.$vux.loading.hide()
        this.$vux.alert.show({
          content: data.Message
        })
      })
    },
    async submitCheck() {
      this.$vux.loading.show({
        text: '正在识别'
      })
      let {data} = await this.$http.post('UserBaiduApi/Addinfo', {
        ApiType: this.step + 1,
        ImageUrl: this.imgPath,
        UserName: this.name,
        IDCard: this.idcard
      })
      if (data.Code == 1) {
        if (this.step == 0) {
          this.name = data.Model.RealName
          this.idcard = data.Model.CardID
        } else if (this.step == 1) {
          if (this.isSetPwd || this.dontNoticeSetPwd) {
            this.$router.back()
          } else {
            this.show1 = true
          }
        }
      } else {
        this.$vux.alert.show({
          content: data.Message
        })
      }
      this.$vux.loading.hide()
    },
    nextStep() {
      if (this.name && this.idcard) {
        this.step ++
      } else {
        this.$vux.toast.text('请先通过身份证认证')
      }
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
