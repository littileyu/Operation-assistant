import axios from './http'

// SHOP 门店  CATEGORY 分类  BRAND 品牌
export function getSelectOptions(type) {
  const url = 'options'
  let params = {
    type
  }
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
