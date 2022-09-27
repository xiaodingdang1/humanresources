// 实现对axios封装
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
const Timeout = 3600
// 对比是否超时
function IsCheckTimeOut() {
  const currentTime = Date.now() // 时间2 接口真正调用的时间
  const timeStamp = (currentTime - store.getters.hrsaasTime) / 1000
  return timeStamp > Timeout // true 超时
}
// 通过axios 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 拦截器（解决axios请求默认加data的问题）
service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  if (error.response.status === 401) {
    store.dispatch('user/logout')
    router.push('login')
    Message.error('token超时')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})

service.interceptors.request.use(config => {
  // console.log(store.getters.token)
  if (store.getters.token) {
    if (IsCheckTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token超时'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
export default service
