export default {
  data() {
    return {
      weiXinPlugin: window.api.require('weiXin')
    }
  },
  mounted() {
    this.weiXinPlugin.registerApp(function(ret, err) {
      if (ret.status) {
        console.log(ret.status)
      } else {
        alert(err.msg)
      }
    })
  },
  methods: {
    wxCancelAuth() {
      this.weiXinPlugin.cancelAuth(function(ret, err) {
        alert(ret.status)
      })
    },
    wxAuth() {
      this.weiXinPlugin.auth((ret, err) => {
        if (ret.status) {
          this.weiXinPlugin.refreshToken((ret, err) => {
            if (ret.status) {
              this.getWxUser()
            } else {
              alert(err.msg)
            }
          })
        } else {
          alert(err.msg)
        }
      })
    },
    getWxUser() {
      this.weiXinPlugin.getUserInfo((ret, err) => {
        if (ret.status) {
          this.$store.commit('setWxInfo', ret)
          // alert(JSON.stringify(ret))
          this.afterWxAuth(ret)
        } else {
          alert(err.msg)
        }
      })
    }
  }
}