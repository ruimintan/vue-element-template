<!--
 * @Author: ruimin.tan@zhangmen.com
 * @Date: 2021-06-21 16:59:28
 * @LastEditTime: 2021-06-21 17:25:12
 * @Description: 
-->
<template>
  <div id="app">
    <!-- App page1 -->
    <dashboard></dashboard>
  </div>
</template>

<script>
  import Dashboard from '@/views/dashboard'
  export default {
    name: 'app',
    components: {
      Dashboard,
    },
  }

</script>
