<template>
  <div />
</template>
<script>
export default {
  data() {
    return {
      loading: '',
    }
  },
  created() {
    this.openFullScreen()
  },
  destroyed() {
    this.loading.close()
  },
  methods: {
    openFullScreen() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    },
  },
}
</script>
