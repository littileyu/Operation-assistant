import axios from './http'
const pageUrl = 'repertories'
export function getDistributionReport (params) {
  const url = pageUrl + '/options'
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getCategoryStockDialog (params) {
  const url = pageUrl + '/category_stock'
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getOptionsDetailDialog (params) {
  const url = pageUrl + '/options_details'
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getStockSpec (params) {
  const url = pageUrl + '/stock_spec'
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
