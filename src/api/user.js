import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

export function getInfo(sacpId) {
  return request({
    url: '/admininfo',
    method: 'get',
    params: { sacpId }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getAllMember() {
  return request({
    url: '/getAllMember',
    method: 'get'
  })
}

export function resetPwd(data) {
  return request({
    url: '/resetPwd',
    method: 'post',
    data
  })
}
