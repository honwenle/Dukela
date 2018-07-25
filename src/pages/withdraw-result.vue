<template>
  <div>
    <d-header :tran="true" :theme-color="true">提现</d-header>
    <timeline>
      <timeline-item>
        <div style="padding: 5px 0 0 10px">提现申请已提交，等待人工审核</div>
      </timeline-item>
      <timeline-item>
        <div style="padding-left: 10px">预计1-3个工作日到账</div>
      </timeline-item>
    </timeline>
    <div class="btn-main">查看详情</div>
  </div>
</template>
<script>
import { Timeline, TimelineItem } from 'vux'
// TODO: 到详情
export default {
  components: {
    Timeline, TimelineItem
  }
}
</script>
