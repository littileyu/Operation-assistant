import axios from 'axios'
import qs from 'qs'
import {baseURL} from './config'

axios.defaults.baseURL = baseURL

// http request 拦截器
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

let post = (url, data) => {
  return axios({
    method: 'post',
    url,
    data: qs.stringify(data)
  })
}

let get = (url, params) => {
  return axios({
    method: 'get',
    url,
    params
  })
}

export default {post, get}
