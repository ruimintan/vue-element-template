<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      debounceFn: null,
    }
  },
  watch: {
    '$route'(to, from) { },
  },
  created() {
    this.$store.dispatch('getPermissions') // 获取权限
    this.resizeHeight()
  },
  mounted() {
    this.debounceFn = this.debounce(this.resizeHeight)
    // 监听改变浏览器窗口大小
    window.addEventListener('resize', this.debounceFn)
  },
  methods: {
    // 防抖
    debounce(fn) {
      let timeout = null
      return () => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          fn.apply(this, arguments)
        }, 500)
      }
    },
    // 改变tableHeight的大小
    resizeHeight() {
      const clientHeight = document.body.clientHeight // 获取文档可视区域的宽度
      const height = Math.max(600, clientHeight - 170) // 保证最小值大于600
      this.$store.commit('settings/setTableHeight', height) // 设置tableHeight
    },

  },
}
</script>
