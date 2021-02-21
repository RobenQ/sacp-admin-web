import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admininfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
