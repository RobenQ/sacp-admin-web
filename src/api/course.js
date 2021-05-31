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

export function searchCourse(data) {
  return request({
    url: '/searchCourse',
    method: 'post',
    data
  })
}

export function searchDiscussion(data) {
  return request({
    url: '/searchDiscussion',
    method: 'post',
    data
  })
}

export function offLineCourse(data) {
  return request({
    url: '/offLineCourse',
    method: 'post',
    data: {
      courseId: data
    }
  })
}

export function offLineDiscussion(data) {
  return request({
    url: '/offLineDiscussion',
    method: 'post',
    data: {
      discussionId: data
    }
  })
}

export function onLineCourse(data) {
  return request({
    url: '/onLineCourse',
    method: 'post',
    data: {
      courseId: data
    }
  })
}

export function onLineDiscussion(data) {
  return request({
    url: '/onLineDiscussion',
    method: 'post',
    data: {
      discussionId: data
    }
  })
}
