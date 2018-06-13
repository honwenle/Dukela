<template>
  <div>
    <check-icon class="gray" :value="value" @update:value="$emit('input', $event)" type="plain">
      同意<span @click="show1 = true">《注册协议》</span>
    </check-icon>
    <x-dialog v-model="show1" hide-on-blur>
      <div class="wrap">
        <div class="title">用户协议</div>
        <div class="p">百度提醒您：在使用百度搜索引擎（以下简称百度）前，请您务必仔细阅读并透彻理解本声明。您可以选择不使用百度，但如果您使用百度，您的使用行为将被视为对本声明全部内容的认可。鉴于百度以非人工检索方式、根据您键入的关键字自动生成到第三方网页的链接，除百度注明之服务条款外，其他一切因使用百度而可能遭致的意外、疏忽、侵权及其造成的损失（包括因下载被搜索链接到的第三方网站内容而感染电脑病毒），百度对其概不负责，亦不承担任何法律责任。</div>
        <div class="btn-foot" @click="show1 = false">同意并继续</div>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import { XDialog, CheckIcon } from 'vux'
export default {
  components: {
    XDialog, CheckIcon
  },
  props: ['value'],
  data() {
    return {
      show1: false,
      readed: false
    }
  }
}
</script>
<style scoped lang="less">
@import '../styles/login.less';
</style>
