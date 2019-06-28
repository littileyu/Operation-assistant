import axios from './http'
const pageUrl = 'returns'
export function getReturnsData (params) {
  const url = pageUrl + '/data'
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getReturnsList (params) {
  const url = pageUrl + '/list'
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getBrandSales (params) {
  const url = pageUrl + '/brand_sales'
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getBrandCategory (params) {
  const url = pageUrl + '/brands'
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
