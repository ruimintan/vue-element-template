import Vue from 'vue'
import moment from 'moment'

// 处理保留两位有效数字
Vue.filter('priceFormat', function(price) {
  // 返回处理后的值
  const patt = /^\d+(\.\d+)?$/
  if (patt.test(price)) {
    return price.toFixed(2)
  }
  return
})

// 时间格式化
Vue.filter('formateDate', (val, formate = 'YYYY-MM-DD HH:mm:ss') => {
  return val ? moment(val).format(formate) : ''
})

// 百分比转化
Vue.filter('percent', function(val) {
  if (val) {
    return (val * 100).toFixed(2) + '%'
  }
  return '-'
})

// 处理时长
// 接受 ms 数，返回 *时*分*秒
Vue.filter('handleTime', function(millisecond) {
  if (!millisecond) {
    return '0秒'
  }
  const h = Math.floor((millisecond / 1000 / 60 / 60))
  const min = Math.floor((millisecond % (1000 * 60 * 60) / 1000 / 60))
  const sec = Math.floor((millisecond % (1000 * 60) / 1000))

  if (h) {
    return `${h}时${min}分${sec}秒`
  }
  if (min) {
    return `${min}分${sec}秒`
  }
  return `${sec}秒`
})
