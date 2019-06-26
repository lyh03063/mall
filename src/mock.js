import Mock from 'mockjs'

const Random = Mock.Random



// 用户数据
const userData = () => {
  
  return {a:1}
}
Mock.mock('/api/users', userData)


Mock.mock('/api/test', function(){
    return {b:2}

})