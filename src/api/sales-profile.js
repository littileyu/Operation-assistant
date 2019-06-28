import axios from './http'

const pageUrl = 'sales/'

export function getSalesData(params) {
  const url = pageUrl + 'data'
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
