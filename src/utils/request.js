import axios from 'axios'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'

/** *
 * axios 拦截请求
 */

// reject 工具
const rejectError = response => new Promise((resolve, reject) => {
  reject(response)
})

axios.interceptors.request.use(function(config) {
  // console.log('请求发送', config)
  NProgress.start()
  return config
}, function(err) {
  // console.log('请求失败', err)
  return rejectError(err)
})

/** *
 * axios 拦截响应
 */
axios.interceptors.response.use(function(response) {
  NProgress.done()
  return response
}, function(error) {
  // console.log('错误响应', error.response)
  NProgress.done()
  if (error.response) {
    const status = `${error.response.status}`
    if (status.charAt(0) === '4') {
      return rejectError({
        message: '客户端错误',
      })
    }
    if (status.charAt(0) === '5') {
      return rejectError({
        message: '服务器错误',
      })
    }
  }

  return rejectError({
    message: '网络不给力, 请稍候重试',
  })
})

/** *
 * axios({url,method,content,params,datas})
 *
 * @param {string}  url，(必填)
 * @param {string}  method,默认post
 * @param {boolean} json, content-type类型，(必填)
 * @param {object}  params
 * @param {object}  datas
 *
 */
export default function request(arr) {
  return new Promise((resolve, reject) => {
    axios({
      // baseURL: '',
      timeout: 10000, // 请求超时时间
      url: arr.url,
      method: arr.method || 'POST',
      headers: {
        // 'version': arr.version || '1.0.0',
        // 'Authorization': '' || '',
        'content-type': arr.json ? 'application/json; charset=UTF-8' : 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      params: arr.params || '',
      data: arr.data || '',
    }).then(function(response) {
      // console.log('response', response)
      /**
       * response格式
       *
       * {
          data:{},
          status:200,
          statusText:'OK',//从服务器返回的http状态文本
          headers: {},//响应头信息
          config: {} //`config`是在请求的时候的一些配置信息
        }
        */
      const responseStatus = `${response.status}`
      if (responseStatus.charAt(0) === '2') {
        // error_password:手机号与密码不匹配
        // error_vcode:手机号与验证码不匹配
        // account_non_exist:手机号未注册
        // account_exist:手机号已注册
        if (response.data.code === '1' || response.data.code === 'err_0004' || response.data.code === 'err_9999' || response.data.code === 'error_password' || response.data.code === 'error_vcode' || response.data.code === 'account_exist' || response.data.code === 'account_non_exist') {
          Message({
            type: 'error',
            message: response.data.message,
          })
          reject(response.data)
          return
        }
        if (response.data.code === '11') {
          Message({
            type: 'error',
            message: response.data.message,
          })
          reject(response.data)
          location.href = `/login?redirectUrl=${encodeURIComponent(location.href)}`
          return
        }

        resolve(response.data)
      } else {
        Message({
          type: 'error',
          message: response.data.message,
        })
        reject(response.data)
      }
    }).catch(function(err) {
      // console.log('catch', err)
      Message({
        type: 'error',
        message: err.message,
      })
      reject(err)
    })
  })
}
