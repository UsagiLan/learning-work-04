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
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../utils/util");
class WeeklyController {
    getReceiveList(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield util_1.tryCatchDetect(function () {
                return __awaiter(this, void 0, void 0, function* () {
                    return [{
                            username: 'zhangsan',
                            to: ['lisi', 'wangwu'],
                            copy: ['xueqiu'],
                            title: 'title1',
                            content: 'content1',
                            time: Date.now(),
                            status: 1
                        }];
                });
            });
        });
    }
    getSendList(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield util_1.tryCatchDetect(function () {
                return __awaiter(this, void 0, void 0, function* () {
                });
            });
        });
    }
    getDeleteList(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield util_1.tryCatchDetect(function () {
                return __awaiter(this, void 0, void 0, function* () {
                });
            });
        });
    }
    deleteWeekly(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield util_1.tryCatchDetect(function () {
                return __awaiter(this, void 0, void 0, function* () {
                });
            });
        });
    }
}
exports.default = new WeeklyController();
