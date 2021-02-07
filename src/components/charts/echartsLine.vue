<template>
  <div ref="echarts" class="echarts" />
</template>
<script>
const elementResizeDetectorMaker = require('element-resize-detector')
import Echarts from 'echarts'
export default {
  components: {
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      // now: formateDate(new Date()),
    }
  },
  watch: {
    list: {
      deep: true,
      handler: function (val, oldVal) {
        this.setEcharts()
      },

    },
  },
  mounted() {
    // 初始化
    this.echartsDemo = Echarts.init(
      this.$refs.echarts
    )
    // 监听大小变化
    const erd = elementResizeDetectorMaker()
    erd.listenTo(this.$refs.echarts, (element) => {
      this.$nextTick(() => {
        this.echartsDemo.resize()
      })
    })

    this.setEcharts()
  },
  methods: {
    setEcharts() {
      const xList = []
      const yList = []

      for (const i of this.list) {
        xList.push(this.$utils.formateDate(i.time, 'HH:mm'))
        if (i.rate !== undefined && i.rate !== null) {
          yList.push((i.rate * 100).toFixed())
        }
      }

      const option = {
        grid: {
          left: '20',
          right: '20',
          top: '40',
          bottom: '10',
          containLabel: true,
        },
        title: {
          text: this.title,
          left: 'left',
          textStyle: {
            fontSize: 13,
          },
          triggerEvent: false,
        },
        color: ['#1D91FC'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xList,
        },
        yAxis: {
          type: 'value',
          splitNumber: 2,
          axisLabel: {
            formatter: '{value}%',
          },
        },
        series: [{
          data: yList,
          type: 'line',
          smooth: true,
          areaStyle: {
            opacity: 0.3,
          },
        }],
        tooltip: {
          trigger: 'axis',
          formatter: '{c}%',
        },
      }

      this.echartsDemo.clear()
      this.echartsDemo.setOption(option)
    },

  },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.echarts {
  width: 100%;
  height: 160px;
}
</style>
