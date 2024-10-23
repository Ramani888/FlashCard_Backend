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
exports.createUserCreditLogsData = exports.createUserCreditData = exports.getUserCreditData = exports.updateUserCreditData = void 0;
const userCredit_model_1 = require("../models/userCredit.model");
const userCreditLogs_model_1 = require("../models/userCreditLogs.model");
const updateUserCreditData = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userCredit_model_1.UserCredit.findOneAndUpdate({ userId: updateData === null || updateData === void 0 ? void 0 : updateData.userId }, { $set: { credit: updateData === null || updateData === void 0 ? void 0 : updateData.credit } }, { new: true, upsert: false });
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.updateUserCreditData = updateUserCreditData;
const getUserCreditData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userCredit_model_1.UserCredit.findOne({ userId: userId === null || userId === void 0 ? void 0 : userId.toString() });
        return result === null || result === void 0 ? void 0 : result.toObject();
    }
    catch (err) {
        throw err;
    }
});
exports.getUserCreditData = getUserCreditData;
const createUserCreditData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = new userCredit_model_1.UserCredit(data);
        yield newData.save();
    }
    catch (err) {
        throw err;
    }
});
exports.createUserCreditData = createUserCreditData;
const createUserCreditLogsData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = new userCreditLogs_model_1.UserCreditLogs(data);
        yield newData.save();
    }
    catch (err) {
        throw err;
    }
});
exports.createUserCreditLogsData = createUserCreditLogsData;
