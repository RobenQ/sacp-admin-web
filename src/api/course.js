import request from '@/utils/request'

export function getAllClassify() {
  return request({
    url: '/getallclassify',
    method: 'get'
  })
}

export function addClassify(data) {
  return request({
    url: '/addclassify',
    method: 'post',
    data
  })
}

export function updateClassify(data) {
  return request({
    url: '/updateclassify',
    method: 'post',
    data
  })
}

export function getClassify(data) {
  return request({
    url: '/getclassify',
    method: 'post',
    data
  })
}
