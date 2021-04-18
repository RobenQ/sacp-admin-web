import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 50000,
  withCredentials: true
})

// 请求前拦截
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Sacp_Token'] = getToken()
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    console.log(res.code)
    if (res.code !== 200) {
      if (res.code === 203) {
        // 重新登录
        MessageBox.confirm('登录信息失效，请重新登录！', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else if (res.code === 301) { // 未登录
        Message({
          message: res.message,
          type: 'error',
          duration: 3 * 1000
        })
      } else if (res.code === 201) { // 账号或密码错误
        Message({
          message: res.message,
          type: 'error',
          duration: 3 * 1000
        })
      } else if (res.code === 202) { // 账号被冻结
        Message({
          message: res.message,
          type: 'error',
          duration: 3 * 1000
        })
      } else {
        Message({
          message: '操作失败！',
          type: 'error',
          duration: 5 * 1000
        })
      }

      return Promise.reject(new Error(res.message || '错误'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: '系统异常！',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
