import request from '@/utils/request'

export function searchPost(data) {
  return request({
    url: '/searchPost',
    method: 'post',
    data
  })
}

export function onLinePost(data) {
  return request({
    url: '/onLinePost',
    method: 'post',
    data: {
      postId: data
    }
  })
}

export function offLinePost(data) {
  return request({
    url: '/offLinePost',
    method: 'post',
    data: {
      postId: data
    }
  })
}
