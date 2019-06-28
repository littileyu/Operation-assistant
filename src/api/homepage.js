import axios from './http'

const pageUrl = 'index/'

export function getTarget() {
  const url = pageUrl + 'target'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getBaseData() {
  const url = pageUrl + 'data'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getMonthChartOption() {
  const url = pageUrl + 'charts'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getPChartOptions() {
  const url = pageUrl + 'p_charts'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
