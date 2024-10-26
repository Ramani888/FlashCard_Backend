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
exports.createUser = exports.updateTempUserPassword = exports.updateTempUser = exports.createTempUser = exports.getTempUserByEmail = exports.getUserByEmail = void 0;
const tempUser_model_1 = require("../models/tempUser.model");
const user_model_1 = require("../models/user.model");
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (user_model_1.User === null || user_model_1.User === void 0 ? void 0 : user_model_1.User.findOne({ email: email }));
        return result === null || result === void 0 ? void 0 : result.toObject();
    }
    catch (err) {
        throw err;
    }
});
exports.getUserByEmail = getUserByEmail;
const getTempUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (tempUser_model_1.TempUser === null || tempUser_model_1.TempUser === void 0 ? void 0 : tempUser_model_1.TempUser.findOne({ email: email }));
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.getTempUserByEmail = getTempUserByEmail;
const createTempUser = (data, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = new tempUser_model_1.TempUser(Object.assign(Object.assign({}, data), { otp: otp }));
        yield newData.save();
        return;
    }
    catch (err) {
        throw err;
    }
});
exports.createTempUser = createTempUser;
const updateTempUser = (data, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tempUser_model_1.TempUser.findOneAndUpdate({ email: data === null || data === void 0 ? void 0 : data.email }, { $set: { otp: otp } }, { new: true, upsert: false });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.updateTempUser = updateTempUser;
const updateTempUserPassword = (data, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tempUser_model_1.TempUser.findOneAndUpdate({ email: data === null || data === void 0 ? void 0 : data.email }, { $set: { otp: otp, password: data === null || data === void 0 ? void 0 : data.password } }, { new: true, upsert: false });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.updateTempUserPassword = updateTempUserPassword;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = {
            userName: data === null || data === void 0 ? void 0 : data.userName,
            email: data === null || data === void 0 ? void 0 : data.email,
            password: data === null || data === void 0 ? void 0 : data.password,
        };
        const newData = new user_model_1.User(userData);
        const savedUser = yield newData.save(); // Save the user and get the saved data
        return savedUser._id; // Return the newly inserted user's ID
    }
    catch (err) {
        throw err;
    }
});
exports.createUser = createUser;
