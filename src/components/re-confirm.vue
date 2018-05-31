<template>
  <div>
    <confirm :value="show1"
      :confirm-text="button"
      cancel-text="跳过"
      @on-hide="$emit('update:show', false)"
      @on-cancel="$router.go(-backStep)"
      @on-confirm="goRoute">
        <div>
          <font-icon name="dui" fontsize="40px" color="#88c66e"></font-icon>
        </div>
        <div v-html="title"></div>
        <div v-html="content"></div>
    </confirm>
  </div>
</template>
<script>
import {Confirm} from 'vux'
export default {
  components: {
    Confirm
  },
  computed: {
    show1() {
      return this.show
    }
  },
  props: [
    'show',
    'backStep',
    'goName',
    'button',
    'title',
    'content'
  ],
  methods: {
    goRoute() {
      this.$router.push(this.goName)
    }
  }
}
</script>
