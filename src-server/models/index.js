const Mongoose = require('mongoose');
let connection = Mongoose.createConnection('mongodb://127.0.0.1:27017/weekly', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
connection.on('open', function () {
    console.log('已连接数据库---weekly')
});
connection.on('error', function () {
    console.log('weekly----数据库出错')
});
// 用户信息数据结构
let UserSchema = new Mongoose.Schema({
    username: String,
    password: String,
    role: String,
    role_id: Number,
    name: String,
    email: String,
});
// 周报数据结构
let WeeklySchema = new Mongoose.Schema({
    username: String,
    name: String,
    to: [String],
    copy: [String],
    title: String,
    content: String,
    time: {
        type: Date,
        default: Date.now()
    },
    status: Number,
    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'User'
    // }
});
// 用户信息模型
let UserModel = connection.model('User', UserSchema);
// 周报数据模型模型
let WeeklyModel = connection.model('Weekly', WeeklySchema);

// 添加新用户
async function createUser (args) {
    const {username, password, role, role_id, name, email = ''} = args;
    const Params = {
        username,
        password,
        role,
        role_id,
        name,
        email
    };
    let result = await UserModel.create(Params);
    console.log('添加成功');
    return result;
};
// 写信
async function createWeekly (args) {
    const {username, to, copy, title, content} = args;
    let userResult = await UserModel.findOne({username: username});
    const name = userResult.name;
    const Params = {
        username,
        name,
        to,
        copy,
        title,
        content,
        time: Date.now(),
        status: 1
    };
    let result = await WeeklyModel.create(Params);
    return result;
};
// 收件箱
async function getInBox (name) {
    let result = await WeeklyModel.find({
        '$or': [
            {'to': { $in: name }},
            {'copy': { $in: name }}]
    });
    console.log('收件箱搜索内容===', result);
    return result;
};
// 发件箱&&删除列表
async function getOutBox (args) {
    // 默认获取发件箱。如果status传入0，则查找已删除
    const { name, status = 1 } = args;
    let result = await WeeklyModel.find({
        username: {$in: name},
        status
    });
    const logname = status == 1 ? '发件箱' : '已删除列表';
    console.log(`${logname}内容====`, result);
    return result;
};
// 查看某条邮件具体内容
async function getWeeklyContent (id) { // 5f45c22726ffa56f633c6d12
    let result = await WeeklyModel.findById(id);
    console.log(`ID---${id}的邮件具体内容是====`, result);
    return result;
};
// 删除邮件
async function deleteWeekly (id) {
    let result = await WeeklyModel.update({
        _id: id
    }, {
        $set: { status: 0 }
    });
    console.log(`ID---${id}的邮件删除成功====`, result);
    return result;
};
// 修改邮件
async function modifyWeekly (args) {
    const { id, title = "", content = "" } = args;
    if (!title && !content) return {};
    let set = {}
    if (title) set.title = title;
    if (content) set.title = content;
    let result = await WeeklyModel.update({
        _id: id
    }, {
        $set: set
    });
    console.log(`ID---${id}的邮件修改成功====`, result);
    return result;
};


module.exports = {
    createUser: createUser,
    createWeekly: createWeekly,
    getInBox: getInBox,
    getOutBox: getOutBox,
    getWeeklyContent: getWeeklyContent,
    deleteWeekly: deleteWeekly,
    modifyWeekly: modifyWeekly
}