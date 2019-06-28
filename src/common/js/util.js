export function normalizePage(page) {
  let list = page.list
  let pageNum = page.pageNum
  let pageSize = page.pageSize
  list.forEach((item, index) => {
    item.index = (pageNum - 1) * pageSize + 1 + index
  })
  return list
}
