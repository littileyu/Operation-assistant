import axios from './http'

const pageUrl = 'employee_report'

export function getMonthData (params) {
  const url = pageUrl + '/month_data'
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getOptions (params) {
  const url = pageUrl + '/options'
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
