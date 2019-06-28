import axios from './http'

const pageUrl = 'members/'

export function getMembersOptions(shopId) {
  const url = pageUrl + 'analysis'
  let params = {
    shopId
  }
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getBrandOption(shopId, category) {
  const url = pageUrl + 'act_brand_sales'
  let params = {
    shopId,
    category
  }
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
