import axios from './http'

const pageUrl = 'h_report/'

export function getChartOptions() {
  const url = pageUrl + 'options'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getCategoryDialogOption(category) {
  const url = pageUrl + 'brand_sales'
  let params = {
    category
  }
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getRatesDialogOptions() {
  const url = pageUrl + 'rates'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getMemberDialogOptions() {
  const url = pageUrl + 'shop_view'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
