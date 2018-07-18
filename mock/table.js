
import Mock from 'mockjs'

var Random = Mock.Random
var data = {
  'date': Random.date('yyyy-MM-dd'),
  'name': Random.cname(),
  'sex|1': ['男', '女'],
  'age|8-50': 1,
  'address': Random.county(true),
  'zip': Random.zip()
}

export default [{
  path: '/table',
  data: data
}]
