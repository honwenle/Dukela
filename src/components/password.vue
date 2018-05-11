<template>
  <div class="center">
    <div class="pwd-h1">请输入交易密码</div>
    <div class="pwd-box">
      <div class="pwd-block"
      v-for="i in 6"
      :key="i"
      :class="{'dot': password.length >= i}"
      ></div>
    </div>
    <div class="pwd-keys">
      <div class="pwd-tip">安全输入键盘</div>
      <div class="flex" v-for="i in 3" :key="i">
        <div class="pwd-key"
        v-for="j in 3"
        :key="j"
        @click="pwdInput((i-1)*3 + j)">
          {{(i-1)*3 + j}}
        </div>
      </div>
      <div class="flex">
        <div class="pwd-key bg-eee"></div>
        <div class="pwd-key" @click="pwdInput(0)">0</div>
        <div class="pwd-key bg-eee" @click="pwdDel"><font-icon name="tuige"></font-icon></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      password: []
    }
  },
  methods: {
    pwdDel() {
      this.password.pop()
    },
    pwdInput(n) {
      this.password.push(n)
      if (this.password.length == 6) {
        // TODO: 提交支付
        this.$router.push({
          name: 'Result'
        })
      }
    }
  }
}
</script>
<style scoped>
.pwd-key{
  flex: 1;
  border-right: 1px solid #eee;
  border-top: 1px solid #eee;
  height: 48px;
  line-height: 48px;
  font-size: 20px;
  font-weight: 500;
}
.pwd-h1{
  padding: 15px 0;
}
.pwd-box{
  padding: 18px;
  display: flex;
}
.pwd-block{
  height: 55px;
  flex: 1;
  background: #fff;
  border-right: 1px solid #eee;
  position: relative;
}
.pwd-block.dot::before{
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #000;
}
.pwd-tip{
  font-size: 12px;
  padding: 3px 0;
}
.pwd-keys{
  background: #fff;
}
.bg-eee{
  background: #eee;
}
</style>
