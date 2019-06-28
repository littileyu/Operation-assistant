import axios from './http'

const pageUrl = 'stock/'

export function getStockStatis(params) {
  const url = pageUrl + 'statis'
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
