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
exports.getTierDataById = exports.getProfileData = exports.createSupportData = exports.updatePasswordData = exports.getSubscriptionData = exports.getUserById = exports.updateProfilePictureData = void 0;
const support_model_1 = require("../models/support.model");
const tier_model_1 = require("../models/tier.model");
const user_model_1 = require("../models/user.model");
const userCredit_model_1 = require("../models/userCredit.model");
const userStorage_model_1 = require("../models/userStorage.model");
const userSubscription_model_1 = require("../models/userSubscription.model");
const mongodb_1 = require("mongodb");
const updateProfilePictureData = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const objectId = new mongodb_1.ObjectId((_a = updateData === null || updateData === void 0 ? void 0 : updateData._id) === null || _a === void 0 ? void 0 : _a.toString());
        const result = yield user_model_1.User.findByIdAndUpdate(objectId, updateData, {
            new: true,
            runValidators: true
        });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.updateProfilePictureData = updateProfilePictureData;
const getUserById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongodb_1.ObjectId(_id === null || _id === void 0 ? void 0 : _id.toString());
        const result = yield user_model_1.User.findOne({ _id: objectId });
        return result === null || result === void 0 ? void 0 : result.toObject();
    }
    catch (err) {
        throw err;
    }
});
exports.getUserById = getUserById;
const getSubscriptionData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tier_model_1.Tier.find();
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.getSubscriptionData = getSubscriptionData;
const updatePasswordData = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const LC_Email = (_a = updateData === null || updateData === void 0 ? void 0 : updateData.email) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        const result = yield user_model_1.User.findOneAndUpdate({ email: LC_Email }, { $set: { password: updateData === null || updateData === void 0 ? void 0 : updateData.password } }, { new: true, upsert: false });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.updatePasswordData = updatePasswordData;
const createSupportData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = new support_model_1.Support(data);
        yield newData.save();
    }
    catch (err) {
        throw err;
    }
});
exports.createSupportData = createSupportData;
const getProfileData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userCreditData = yield userCredit_model_1.UserCredit.findOne({ userId: userId });
        const userStorageData = yield userStorage_model_1.UserStorage.findOne({ userId: userId });
        const userSubscriptionData = yield userSubscription_model_1.UserSubscription.findOne({ userId: userId });
        const userTierData = yield tier_model_1.Tier.findOne({ _id: new mongodb_1.ObjectId((_a = userSubscriptionData === null || userSubscriptionData === void 0 ? void 0 : userSubscriptionData.tierId) === null || _a === void 0 ? void 0 : _a.toString()) });
        return {
            userCreditData: userCreditData === null || userCreditData === void 0 ? void 0 : userCreditData.toObject(),
            userStorageData: userStorageData === null || userStorageData === void 0 ? void 0 : userStorageData.toObject(),
            userSubscriptionData: userSubscriptionData === null || userSubscriptionData === void 0 ? void 0 : userSubscriptionData.toObject(),
            userTierData: userTierData === null || userTierData === void 0 ? void 0 : userTierData.toObject()
        };
    }
    catch (err) {
        throw err;
    }
});
exports.getProfileData = getProfileData;
const getTierDataById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongodb_1.ObjectId(_id === null || _id === void 0 ? void 0 : _id.toString());
        const result = yield tier_model_1.Tier.findOne({ _id: objectId });
        return result === null || result === void 0 ? void 0 : result.toObject();
    }
    catch (err) {
        throw err;
    }
});
exports.getTierDataById = getTierDataById;
