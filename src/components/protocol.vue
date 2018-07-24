<template>
  <div>
    <x-dialog :show="value" @on-hide="$emit('input', false)">
      <div class="wrap">
        <div class="title">{{title}}</div>
        <div class="p agree-box">
          <slot></slot>
        </div>
        <div class="btn-foot" @click="$emit('agree')">同意并继续</div>
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
  props: ['title', 'value']
}
</script>
<style scoped lang="less">
.agree-box{
  max-height: 300px;
  overflow: auto;
}
.wrap{
  padding: 10px 0;
}
.title {
  font-size: 18px;
}
.p {
  font-size: 14px;
  text-align: left;
  padding: 10px 20px;
}
.btn-foot {
  color: @theme-color;
  border-top: 1px solid #ddd;
  padding-top: 5px;
}
</style>
