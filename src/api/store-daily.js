import axios from './http'

const pageUrl = 'shop_report/'

export function getBaseData(shopId) {
  const url = pageUrl + 'yestoday_data'
  let params = {
    shopId
  }
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getChartOptions(shopId) {
  const url = pageUrl + 'options'
  let params = {
    shopId
  }
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getRateList(params) {
  const url = pageUrl + 'products'
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
