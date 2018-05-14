<template>
  <div>
    <x-header>设置</x-header>
    <group :gutter="0">
      <cell title="客服电话" is-link>
        <a href="tel:4000000000">点击拨打400-000-0000</a>
      </cell>
      <cell title="版本信息" link="version">1.0版</cell>
    </group>
    <div class="btn-main">退出</div>
  </div>
</template>
<script>
import { Group, Cell } from 'vux'
export default {
  components: {
    Group, Cell
  }
}
</script>

<style scoped>
.weui-cell a{
  color: #c8c8cd;
}
</style>
