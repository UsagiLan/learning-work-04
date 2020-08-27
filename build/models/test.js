const FunctionSet = require('./index');
let newUserRes = FunctionSet.createWeekly({
    username: 'xixi',
    to: ['zhangsan', 'lisi', 'yangshenglan'],
    copy: ['lisi'],
    title: '插入数据66',
    content: '主表插入数据。子表插入数据。 blogid为刚插入主表的主键'
}).then(res => {
    console.log('外部最终写信返回结果===', res);
});
