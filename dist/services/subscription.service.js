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
exports.getSubscriptionDataByuserId = exports.updateSubscriptionData = exports.createSubscriptionData = void 0;
const userSubscription_model_1 = require("../models/userSubscription.model");
const mongodb_1 = require("mongodb");
const subscription_1 = require("../utils/constants/subscription");
const createSubscriptionData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield userSubscription_model_1.UserSubscription.find({ userId: (_a = data === null || data === void 0 ? void 0 : data.userId) === null || _a === void 0 ? void 0 : _a.toString() });
        if ((result === null || result === void 0 ? void 0 : result.length) > 0) {
            throw new Error(subscription_1.USER_ALREADY_SUBSCRIBED);
        }
        const newData = new userSubscription_model_1.UserSubscription(data);
        yield newData.save();
    }
    catch (err) {
        throw err;
    }
});
exports.createSubscriptionData = createSubscriptionData;
const updateSubscriptionData = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const objectId = new mongodb_1.ObjectId((_a = updateData === null || updateData === void 0 ? void 0 : updateData._id) === null || _a === void 0 ? void 0 : _a.toString());
        const result = yield userSubscription_model_1.UserSubscription.findByIdAndUpdate(objectId, updateData, {
            new: true,
            runValidators: true
        });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.updateSubscriptionData = updateSubscriptionData;
const getSubscriptionDataByuserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (userSubscription_model_1.UserSubscription === null || userSubscription_model_1.UserSubscription === void 0 ? void 0 : userSubscription_model_1.UserSubscription.findOne({ userId: userId }));
        return result === null || result === void 0 ? void 0 : result.toObject();
    }
    catch (err) {
        throw err;
    }
});
exports.getSubscriptionDataByuserId = getSubscriptionDataByuserId;
