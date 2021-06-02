import request from '@/utils/request'

export function searchPost(data) {
  return request({
    url: '/searchPost',
    method: 'post',
    data
  })
}

export function searchPostReply(data) {
  return request({
    url: '/searchPostReply',
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

export function onLinePostReply(data) {
  return request({
    url: '/onLinePostReply',
    method: 'post',
    data: {
      replyId: data
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

export function offLinePostReply(data) {
  return request({
    url: '/offLinePostReply',
    method: 'post',
    data: {
      replyId: data
    }
  })
}
