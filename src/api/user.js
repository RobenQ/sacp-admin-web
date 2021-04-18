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

export function getMemeberRoleInfo(data) {
  return request({
    url: '/getMemeberRoleInfo',
    method: 'post',
    data
  })
}

export function disallowPost(data) {
  return request({
    url: '/disallowPost',
    method: 'post',
    data
  })
}

export function disallowLogin(data) {
  return request({
    url: '/disallowLogin',
    method: 'post',
    data
  })
}

export function resetStatus(data) {
  return request({
    url: '/resetStatus',
    method: 'post',
    data
  })
}

export function resetPwd(data) {
  return request({
    url: '/resetPwd',
    method: 'post',
    data
  })
}

export function getAllActiveUsers() {
  return request({
    url: '/activrUsers',
    method: 'post'
  })
}

export function offLineUser(data) {
  return request({
    url: '/offLineUser',
    method: 'post',
    data
  })
}
