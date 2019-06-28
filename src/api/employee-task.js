import axios from './http'

const pageUrl = 'tasks/'

export function getEmployeeTasks(params) {
  const url = pageUrl
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function updateEmployeeTask(data) {
  const url = pageUrl + 'update_emp_task'
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}
