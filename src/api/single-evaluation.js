import axios from './http'
const pageUrl = 'assess'
export function getAssessEmployee (params) {
  const url = pageUrl + '/employee'
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getAssessShop (params) {
  const url = pageUrl + '/shop'
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
