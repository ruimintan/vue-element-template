<template>
  <div class="pagination">
    <el-pagination
      :current-page.sync="curPage"
      :page-sizes="[10, 15, 20, 30]"
      :page-size="pageSize"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="changePage"
    />
  </div>

</template>

<script>
export default {
  props: {
    // 列表总数
    total: {
      type: Number,
      default: 0,
    },
    // 分页大小
    pageSize: {
      type: Number,
      default: 20,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      curPage: 1,
    }
  },
  watch: {
    currentPage: function(val) {
      this.curPage = val
    },
  },
  methods: {
    // 每页显示的条数
    handleSizeChange(val) {
      this.curPage = 1
      this.$emit('changePage', this.curPage, val)
    },
    // 切换分页
    changePage() {
      this.$emit('changePage', this.curPage, this.pageSize)
    },
  },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.pagination{
  display: flex;
  justify-content: center;
  padding-top: 10px;
}
</style>
