const FunctionSet = require('./index');
console.log(FunctionSet)
// 添加新用户
// let newUserRes = FunctionSet.createUser({
//     username: 'wangergou',
//     password: '1234',
//     role: '主管',
//     role_id: '2',
//     name: '王二狗',
//     email: 'wangergou@58.com'
// })

 // 写信
//  let newUserRes = FunctionSet.createWeekly({
//     username: 'wangergou',
//     to: ['zhangsan'],
//     copy: ['lisi'],
//     title: '开工啦哈哈哈哈哈哈11',
//     content: '开工啦哈哈哈哈哈哈开工啦哈哈哈哈哈哈开工啦哈哈哈哈哈哈！！'
// }).then(res => {
//     console.log(res)
// })

// 收件箱
// FunctionSet.getInBox('zhangsan').then((res) => {
//     console.log('收件箱11==', res)
// })

// 发件箱/已删除
// FunctionSet.getOutBox({
//     name: 'lizhen',
//     status: 0
// }).then(res => {
//     console.log('发件箱11==', res)
// })

// 查看某条邮件具体内容
FunctionSet.getWeeklyContent('5f45c22726ffa56f633c6d12').then(res => {

})

// 删除邮件
FunctionSet.deleteWeekly('5f45c22726ffa56f633c6d12').then(res => {
    
})