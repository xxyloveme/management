import Mock from 'mockjs'
import login from './login'
import table from './table'

let data = [].concat(login, table)

data.forEach(function (res) {
  Mock.mock(res.path, res.data)
})

export default Mock
