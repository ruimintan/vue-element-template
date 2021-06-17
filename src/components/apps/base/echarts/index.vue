<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: 'calc(100vh - 50px)'
      },
      option: {
        type: Object,
        default: () => {
          return {
            backgroundColor: '#f1f1f1',
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true
            }]
          }
        },
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = this.$echarts.init(document.getElementById(this.id))
        this.chart.setOption(this.option)
      }
    }
  }

</script>
