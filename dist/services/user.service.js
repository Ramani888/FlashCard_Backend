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
exports.updateUserStorageLimitData = exports.updateUserStorageData = exports.getUserStorageData = exports.createUserStorageLogsData = exports.createUserStorageData = exports.createUserCreditLogsData = exports.createUserCreditData = exports.getUserCreditData = exports.updateUserCreditData = void 0;
const userCredit_model_1 = require("../models/userCredit.model");
const userCreditLogs_model_1 = require("../models/userCreditLogs.model");
const userStorage_model_1 = require("../models/userStorage.model");
const userStorageLogs_model_1 = require("../models/userStorageLogs.model");
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
const createUserStorageData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = new userStorage_model_1.UserStorage(data);
        yield newData.save();
    }
    catch (err) {
        throw err;
    }
});
exports.createUserStorageData = createUserStorageData;
const createUserStorageLogsData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = new userStorageLogs_model_1.UserStorageLogs(data);
        yield newData.save();
    }
    catch (err) {
        throw err;
    }
});
exports.createUserStorageLogsData = createUserStorageLogsData;
const getUserStorageData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userStorage_model_1.UserStorage.findOne({ userId: userId === null || userId === void 0 ? void 0 : userId.toString() });
        return result === null || result === void 0 ? void 0 : result.toObject();
    }
    catch (err) {
        throw err;
    }
});
exports.getUserStorageData = getUserStorageData;
const updateUserStorageData = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userStorage_model_1.UserStorage.findOneAndUpdate({ userId: updateData === null || updateData === void 0 ? void 0 : updateData.userId }, { $set: { coveredStorage: updateData === null || updateData === void 0 ? void 0 : updateData.coveredStorage, coveredStorageUnit: updateData === null || updateData === void 0 ? void 0 : updateData.coveredStorageUnit } }, { new: true, upsert: false });
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.updateUserStorageData = updateUserStorageData;
const updateUserStorageLimitData = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userStorage_model_1.UserStorage.findOneAndUpdate({ userId: updateData === null || updateData === void 0 ? void 0 : updateData.userId }, { $set: { storage: updateData === null || updateData === void 0 ? void 0 : updateData.storage, unit: updateData === null || updateData === void 0 ? void 0 : updateData.unit } }, { new: true, upsert: false });
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.updateUserStorageLimitData = updateUserStorageLimitData;
