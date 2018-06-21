export default {
  data() {
    return {
      wxPlugin: window.api && window.api.require('wx'),
      showWx: false
    }
  },
  mounted() {
    this.wxPlugin.isInstalled((ret, err) => {
      if (ret.installed) {
        this.showWx = true
      }
    })
  },
  methods: {
    wxAuth() {
      this.wxPlugin.auth((ret, err) => {
        if (ret.status) {
          this.getToken(ret.code)
        } else {
          this.$vux.toast.text(
            ['未知错误', '成功，用户同意', '用户取消', '用户拒绝授权', '当前设备未安装微信客户端'][err.code + 1]
          )
        }
      })
    },
    getToken(code) {
      this.wxPlugin.getToken({
        code
      }, (ret, err) => {
        if (ret.status) {
          this.getWxUser(ret.accessToken, ret.openId)
        } else {
          this.$vux.toast.text('授权失败')
        }
      })
    },
    getWxUser(accessToken, openId) {
      this.wxPlugin.getUserInfo({
        accessToken,
        openId
      }, (ret, err) => {
        if (ret.status) {
          // alert(JSON.stringify(ret))
          this.$store.commit('setWxInfo', ret)
          this.afterWxAuth(ret)
        } else {
          alert(err.msg)
        }
      })
    }
  }
}