
var data = {
  'login': '@boolean',
  'message': '这里是登录提交后错误提示信息@increment',
  'uid': '@id',
  'name|1': ['admin', 'user'],
  'token': '@guid'

}

export default [{
  path: '/login',
  data: data
}]
