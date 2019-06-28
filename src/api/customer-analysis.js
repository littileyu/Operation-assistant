import axios from './http'

const pageUrl = 'single_customer/'

export function getBaseData(shopId) {
  const url = pageUrl + 'data'
  let params = {
    shopId
  }
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getCustomerOptions(shopId) {
  const url = pageUrl + 'options'
  let params = {
    shopId
  }
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
