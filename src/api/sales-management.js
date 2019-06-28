import axios from './http'

const pageUrl = 'tasks/'

export function getShopTasks(params) {
  const url = pageUrl
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function updateShopTask(data) {
  const url = pageUrl + 'update_shop_task'
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSalesTrend(shopId) {
  const url = pageUrl + 'sales_trend'
  let params = {
    shopId
  }
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
