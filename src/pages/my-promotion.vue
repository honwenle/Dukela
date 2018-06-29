<template>
  <div>
    <div class="wave-top">
      <d-header :tran="true">
        我的推广
      </d-header>
      <div class="wave-top-tran flex flex-center space-between">
        <div>
          <div class="fz25">{{400}}</div>
          <div class="gray">我的推广业绩(万元)</div>
        </div>
        <div>
          <div class="fz25">{{1000}}</div>
          <div class="gray">累计推广收益(元)</div>
        </div>
      </div>
    </div>
    <group>
      <cell title="我的推广码" :value="123456"></cell>
      <cell title="收益明细" link="promotion-record"></cell>
    </group>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
