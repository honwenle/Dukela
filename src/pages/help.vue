<template>
  <div>
    <d-header>帮助</d-header>
    <list
      action-name="getHelpList"
      :dataLength="helpList.length"
      :height="`${-67 - 50}`">
      <group :gutter="0">
        <cell v-for="item in helpList"
          :key="item.ID"
          :title="item.Title"
          @click.native="goDetail(item)"
          is-link
        >
        </cell>
      </group>
    </list>
  </div>
</template>
<script>
export default {
  computed: {
    helpList() {
      return this.$store.state.helpList
    }
  },
  methods: {
    goDetail(item) {
      this.$store.commit('setHelpDetail', item)
      this.$router.push('help-detail')
    }
  }
}
</script>
