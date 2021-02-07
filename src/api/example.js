import request from '@/utils/request'
// 网关标识
import { gatewaySign } from '@/config'

// 权限 获取用户角色菜单
export function getPermissionRoles(appCode) {
  return request({
    url: '/api/auth/sys/initInfo',
    method: 'GET',
    json: true,
    params: {
      appCode,
    },
  })
}

export function metaDataAdd(data) {
  return request({
    url: '/api/' + gatewaySign + '/metaData/add',
    method: 'POST',
    json: true,
    data,
  })
}

export function reconnectRate(params) {
  return request({
    url: '/api/' + gatewaySign + '/realTimeClass/reconnectRate',
    method: 'GET',
    json: true,
    params,
  })
}
