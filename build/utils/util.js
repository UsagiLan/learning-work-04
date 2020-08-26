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
exports.tryCatchDetect = void 0;
function tryCatchDetect(func) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = null;
        try {
            result = yield func();
            return {
                code: 0,
                message: "success",
                data: result
            };
        }
        catch (e) {
            return {
                code: 1,
                message: e.message,
                data: JSON.stringify(e)
            };
        }
    });
}
exports.tryCatchDetect = tryCatchDetect;
