import axios from 'axios'

// 创建 axios 实例
const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios 请求拦截器
http.interceptors.request.use(config => {
  return config
}, e => Promise.reject(e))

// axios 响应式拦截器
http.interceptors.response.use(res => res.data, e => {
  return Promise.reject(e)
})

export default http