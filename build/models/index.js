var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Mongoose = require('mongoose');
let connection = Mongoose.createConnection('mongodb://127.0.0.1:27017/weekly', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
connection.on('open', function () {
    console.log('已连接数据库---weekly');
});
connection.on('error', function () {
    console.log('weekly----数据库出错');
});
let UserSchema = new Mongoose.Schema({
    username: String,
    password: String,
    role: String,
    role_id: Number,
    name: String,
    email: String,
});
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
});
let UserModel = connection.model('User', UserSchema);
let WeeklyModel = connection.model('Weekly', WeeklySchema);
function createUser(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password, role, role_id, name, email = '' } = args;
        const Params = {
            username,
            password,
            role,
            role_id,
            name,
            email
        };
        let result = yield UserModel.create(Params);
        console.log('添加成功');
        return result;
    });
}
;
function createWeekly(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, to, copy, title, content } = args;
        let userResult = yield UserModel.findOne({ username: username });
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
        let result = yield WeeklyModel.create(Params);
        return result;
    });
}
;
function getInBox(name) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield WeeklyModel.find({
            '$or': [
                { 'to': { $in: name } },
                { 'copy': { $in: name } }
            ]
        });
        console.log('收件箱搜索内容===', result);
        return result;
    });
}
;
function getOutBox(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, status = 1 } = args;
        let result = yield WeeklyModel.find({
            username: { $in: name },
            status
        });
        const logname = status == 1 ? '发件箱' : '已删除列表';
        console.log(`${logname}内容====`, result);
        return result;
    });
}
;
function getWeeklyContent(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield WeeklyModel.findById(id);
        console.log(`ID---${id}的邮件具体内容是====`, result);
        return result;
    });
}
;
function deleteWeekly(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield WeeklyModel.update({
            _id: id
        }, {
            $set: { status: 0 }
        });
        console.log(`ID---${id}的邮件删除成功====`, result);
        return result;
    });
}
;
function modifyWeekly(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, title = "", content = "" } = args;
        if (!title && !content)
            return {};
        let set = {};
        if (title)
            set.title = title;
        if (content)
            set.title = content;
        let result = yield WeeklyModel.update({
            _id: id
        }, {
            $set: set
        });
        console.log(`ID---${id}的邮件修改成功====`, result);
        return result;
    });
}
;
module.exports = {
    createUser: createUser,
    createWeekly: createWeekly,
    getInBox: getInBox,
    getOutBox: getOutBox,
    getWeeklyContent: getWeeklyContent,
    deleteWeekly: deleteWeekly,
    modifyWeekly: modifyWeekly
};
