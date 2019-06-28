import axios from './http'

const pageUrl = 'employees'

export function getEmployees(params) {
  const url = pageUrl
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
