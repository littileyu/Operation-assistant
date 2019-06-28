let baseURL

if (process.env.NODE_ENV === 'development') { // 开发环境
  baseURL = 'http://192.168.1.122:81/ass/api/'
  // baseURL = 'http://192.168.1.89:82/ass/api/'
} else { // 生产环境
  baseURL = ''
}

const ERR_OK = 20000

export {baseURL, ERR_OK}
