import axios from 'axios'

// axios 配置
axios.defaults.timeout = 5000

let obj = {
  // 登录
  login (params) {
    return fetch('/login', 'post', params)
  },
  getToken (params) {
    return fetch('/getToken', 'post', params)
  },
  getData (params) {
    return fetch('/table', 'post', params)
  }
}

const fetch = (url, require, params) => axios({
  url: url,
  method: require,
  data: params
})

export default obj
