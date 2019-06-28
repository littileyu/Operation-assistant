import axios from './http'

const pageUrl = 'allocations'

export function getReferenceList(params) {
  let url = pageUrl
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getLineOption(params) {
  let url = pageUrl + '/sales'
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getStockOption(params) {
  let url = pageUrl + '/stock_sales'
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
