import axios from './http'

const pageUrl = 'purchases/'

export function getChartOptions() {
  const url = pageUrl + 'data'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getPurchaseProducts(params) {
  const url = pageUrl + 'purchase_products'
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getPinProducts(params) {
  const url = pageUrl + 'pin_products'
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
