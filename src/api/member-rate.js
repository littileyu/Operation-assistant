import axios from './http'

const pageUrl = 'members/'

export function getMemberList(shopId, category, brand, beginDate, endDate, pageNumber) {
  const url = pageUrl + 'consume_rank'
  let params = {
    shopId,
    category,
    brand,
    beginDate,
    endDate,
    pageNumber
  }
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}
