import axios from './http'

const pageUrl = 'discounts/'

export function getChartOptions(shopId) {
  const url = pageUrl + 'data'
  let params = {
    shopId
  }
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getBrandOption(shopId, category) {
  const url = pageUrl + 'brands'
  let params = {
    shopId,
    category
  }
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSalesList(params) {
  const url = pageUrl + 'products'
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
