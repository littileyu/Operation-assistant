import axios from './http'

const pageUrl = 'members/'

export function getMemberInfo(memberId) {
  const url = pageUrl + 'view'
  let params = {
    memberId
  }
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
