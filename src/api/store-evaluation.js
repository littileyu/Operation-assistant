import axios from './http'

const pageUrl = 'assess/'

export function getShopsData() {
  const url = pageUrl + 'shops'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
