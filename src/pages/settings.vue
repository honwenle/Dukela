<template>
  <div>
    <x-header>设置</x-header>
    <group :gutter="0">
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
