"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const WeeklyController_1 = require("../controller/WeeklyController");
module.exports = function (app) {
    app.use(function (req, res, next) {
        console.log('Time:', Date.now());
        next();
    });
    app.get('/', function (req, res, next) {
        res.render('index.njk');
    });
    app.get('/user', function (req, res, next) {
        res.send({
            code: 0,
            message: "",
            data: {
                list: []
            }
        });
    });
    app.post('/commit', function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            res.send(yield WeeklyController_1.default.sendWeekly(req.body));
        });
    });
    app.get('/receive/list', function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let { username } = req.query;
            console.log(username);
            res.send(yield WeeklyController_1.default.getReceiveList(username));
        });
    });
    app.get('/receive/delete', function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.query;
            res.send(yield WeeklyController_1.default.deleteWeekly(id));
        });
    });
};
