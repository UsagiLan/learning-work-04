const FunctionSet = require('./index');
// console.log(FunctionSet)
// 添加新用户
// let newUserRes = FunctionSet.createUser({
//     username: 'xixi',
//     password: '123456',
//     role: '主管',
//     role_id: '2',
//     name: '嘻嘻',
//     email: 'xixi@58.com'
// }).then(res => {
//     console.log(res)
// })

 // 写信
 let newUserRes = FunctionSet.createWeekly({
    username: 'xixi',
    to: ['zhangsan', 'lisi', 'yangshenglan'],
    copy: ['lisi'],
    title: '插入数据66',
    content: '主表插入数据。子表插入数据。 blogid为刚插入主表的主键'
}).then(res => {
    console.log('外部最终写信返回结果===', res)
})

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
// FunctionSet.getWeeklyContent('5f45c22726ffa56f633c6d12').then(res => {

// })

// 删除邮件
// FunctionSet.deleteWeekly('5f45c22726ffa56f633c6d12').then(res => {
    
// })