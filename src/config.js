export const envName = process.env.VUE_APP_ENV_NAME

// 系统名称
const defaultSettings = require('./settings.js')
export const systemName = defaultSettings.title

// 接口认证字段
export const apiKey = '1a2f8aaf2ced91e3aa9a618e19b01477'
export const apiSecret = '38d3f8827b96fef6fb7ac87c9425fade'

// 权限 appCode
export const appCode = process.env.VUE_APP_APP_CODE

// 网关地址
export const gatewaySign = 'uke-monitoring-biz'
