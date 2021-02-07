import _ from 'lodash'
import moment from 'moment'
class Utils {
  /**
   * 字符串转日期
   *
   * @static
   * @param {any} dateString 日期字符串:'2017-01-01' | '2017-01-01 00:00:00' | '2017/01/01' | '2017/01/01 00:00:00'
   * @returns Date
   * @memberof Utils
   */
  static stringToDate (dateString) {
    if (!dateString) {
      return ''
    }
    // 兼容各浏览器,使用/代替-
    dateString = dateString.replace(/-/g, '/')
    const date = new Date(dateString)
    return date
  }
  /**
   * 日期字符串转日期字符串
   *
   * @static
   * @param {string} date Date日期对象
   * @param {boolean} [hasTime=false] 是否显示时间
   * @param {string} [dateSeparator='/'] 日期分隔符,推荐'/'以兼容各浏览器
   * @param {string} [timeSeparator=':'] 时间分隔符
   * @returns string '2017/01/01' | '2017/01/01 00:00:00' | ''
   * @memberof Utils
   */
  static stringToDateString (dateString, hasTime = false, dateSeparator = '-', timeSeparator = ':') { // hasTime - false:1900/01/01, true:1900/01/01 00:00:00
    const date = this.stringToDate(dateString)
    if (date !== '') {
      return this.dateToDateString(date, hasTime, dateSeparator, timeSeparator)
    }
    return date
  }
  /**
   * 日期对象转字符串
   *
   * @static
   * @param {date} date Date日期对象
   * @param {boolean} [hasTime=false] 是否显示时间
   * @param {string} [dateSeparator='/'] 日期分隔符,推荐'/'以兼容各浏览器
   * @param {string} [timeSeparator=':'] 时间分隔符
   * @returns string '2017/01/01' | '2017/01/01 00:00:00' | ''
   * @memberof Utils
   */
  static dateToDateString (date, hasTime = false, dateSeparator = '-', timeSeparator = ':') {
    if (_.isDate(date)) {
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const seconds = date.getSeconds()
      const tmp = []
      tmp.push(year)
      tmp.push(dateSeparator)
      tmp.push(this.fixedString(month + 1))
      tmp.push(dateSeparator)
      tmp.push(this.fixedString(day))
      if (hasTime) {
        tmp.push(' ')
        tmp.push(this.fixedString(hours))
        tmp.push(timeSeparator)
        tmp.push(this.fixedString(minutes))
        tmp.push(timeSeparator)
        tmp.push(this.fixedString(seconds))
      }
      date = tmp.join('')
      return date
    } else {
      return ''
    }
  }
  /**
   * UNIX时间戳转字符串
   *
   * @static
   * @param {timeStemp} timeStemp UNIX时间戳
   * @param {boolean} [hasTime=false] 是否显示时间
   * @param {string} [dateSeparator='/'] 日期分隔符,推荐'/'以兼容各浏览器
   * @param {string} [timeSeparator=':'] 时间分隔符
   * @returns string '2017/01/01' | '2017/01/01 00:00:00' | ''
   * @memberof Utils
   */
  static timestampToDateString (timeStemp, hasTime = true, dateSeparator = '-', timeSeparator = ':') {
    if (!timeStemp || !_.isNumber(+timeStemp)) {
      return timeStemp
    }
    timeStemp = timeStemp.toString().substr(0, 10)
    const time = this.dateToDateString(new Date(timeStemp * 1000), hasTime, dateSeparator, timeSeparator)
    return time
  }
  static timestampToDate (timeStemp, hasTime = true, dateSeparator = '-', timeSeparator = ':') {
    if (!timeStemp || !_.isNumber(+timeStemp)) {
      return timeStemp
    }
    timeStemp = timeStemp.toString().substr(0, 10)
    return new Date(timeStemp * 1000)
  }
  /**
   * 日期对象转UNIX时间戳
   *
   * @static
   * @param {date} date 时间对象
   * @returns string '0123456789'
   * @memberof Utils
   */
  static dateToTimestamp (date, full = true) {
    if (!_.isDate(new Date(date))) {
      return date
    }
    const timestamp = +date
    return timestamp.toString().substr(0, full ? 13 : 10)
  }
  /**
   * 格式化字符串,前置补填位符
   *
   * @static
   * @param {any} string 要格式的字符串,为空则全补填位符
   * @param {number} [length=2] 字符串最小长度,超出不处理
   * @param {string} [space='0'] 默认填位符
   * @returns {string} '05'
   * @memberof Utils
   */
  static fixedString (string, length = 2, space = '0') {
    if (string) {
      string = string.toString()
    } else {
      string = ''
    }
    const tmp = []
    const stringLen = string.length
    const stringArray = string.split('').reverse()
    if (stringLen < length) {
      _.times(length, (n) => {
        const i = length - n - 1
        // console.log(length, n, stringLen, i)
        tmp.push(i >= stringLen ? space : stringArray[i])
      })
      return tmp.join('')
    } else {
      return string
    }
  }

  static formatNumber (data, fixed = 2) { // 格式化数字，每三位加逗号，fixed表示小数位
    if (!isNaN(data)) {
      return data.toFixed(fixed).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
    } else {
      return data
    }
  }

  // 时间格式化
  static formateDate(val, formate = 'YYYY-MM-DD HH:mm:ss') {
    return val ? moment(val).format(formate) : ''
  }

  // 数字保留两位小数
  static toFixed2(val) {
  const patt = /^\d+(\.)?\d*$/
  if (patt.test(val)) {
    return Number(val).toFixed(2)
  }
  return val
}

  // 字典类型转换
  static formatType (dictDatas, val) { 
    if (!val) {
      return '-'
    }
    let label = '-'
    for (let i = 0; i < dictDatas.length; i++) {
      if (val === dictDatas[i].value) {
        label = dictDatas[i].label
        break
      }
    }
    return label
  }

}
/* eslint-disable no-extend-native */
String.prototype.toDate = function () {
  return Utils.timestampToDate(this)
}

String.prototype.toDateString = function () {
  return Utils.timestampToDateString(this)
}

export default Utils
