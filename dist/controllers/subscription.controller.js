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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelSubscription = exports.updateSubscription = exports.createSubscription = void 0;
const http_status_codes_1 = require("http-status-codes");
const subscription_1 = require("../utils/constants/subscription");
const subscription_service_1 = require("../services/subscription.service");
const date_1 = require("../utils/helpers/date");
const profile_service_1 = require("../services/profile.service");
const user_service_1 = require("../services/user.service");
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        const endDate = (0, date_1.getOneMonthAfterDate)(bodyData === null || bodyData === void 0 ? void 0 : bodyData.startDate);
        yield (0, subscription_service_1.createSubscriptionData)(Object.assign(Object.assign({}, bodyData), { endDate: endDate }));
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: subscription_1.SubscriptionApiSource.post.createSubscription.message });
    }
    catch (err) {
        console.log(err);
        if (err.message === subscription_1.USER_ALREADY_SUBSCRIBED) {
            res.status(http_status_codes_1.StatusCodes.CONFLICT).send({ error: subscription_1.USER_ALREADY_SUBSCRIBED });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Internal server error' });
        }
    }
});
exports.createSubscription = createSubscription;
const updateSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req === null || req === void 0 ? void 0 : req.body;
    try {
        const endDate = (0, date_1.getOneMonthAfterDate)(bodyData === null || bodyData === void 0 ? void 0 : bodyData.startDate);
        yield (0, subscription_service_1.updateSubscriptionData)(Object.assign(Object.assign({}, bodyData), { endDate: endDate }));
        //Update User Storage
        const tierData = yield (0, profile_service_1.getTierDataById)(bodyData === null || bodyData === void 0 ? void 0 : bodyData.tierId);
        const updateTierData = {
            storage: Number(tierData === null || tierData === void 0 ? void 0 : tierData.cloudStorage),
            unit: String(tierData === null || tierData === void 0 ? void 0 : tierData.cloudeStorageUnit),
            userId: bodyData === null || bodyData === void 0 ? void 0 : bodyData.userId
        };
        yield (0, user_service_1.updateUserStorageLimitData)(updateTierData);
        yield (0, user_service_1.createUserStorageLogsData)({ userId: bodyData === null || bodyData === void 0 ? void 0 : bodyData.userId, storage: Number(tierData === null || tierData === void 0 ? void 0 : tierData.cloudStorage), unit: String(tierData === null || tierData === void 0 ? void 0 : tierData.cloudeStorageUnit), type: 'added', note: 'When update subscription tier.' });
        //Update User Credit
        const userCreditData = yield (0, user_service_1.getUserCreditData)(bodyData === null || bodyData === void 0 ? void 0 : bodyData.userId);
        const creditCount = Number(userCreditData === null || userCreditData === void 0 ? void 0 : userCreditData.credit) + Number(tierData === null || tierData === void 0 ? void 0 : tierData.credit);
        yield (0, user_service_1.updateUserCreditData)({ userId: bodyData === null || bodyData === void 0 ? void 0 : bodyData.userId, credit: Number(creditCount) });
        yield (0, user_service_1.createUserCreditLogsData)({ userId: bodyData === null || bodyData === void 0 ? void 0 : bodyData.userId, creditBalance: Number(userCreditData === null || userCreditData === void 0 ? void 0 : userCreditData.credit), type: 'credited', note: 'When update subscription tier.' });
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: subscription_1.SubscriptionApiSource.put.updateSubscription.message });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.updateSubscription = updateSubscription;
const cancelSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { packageName, subscriptionId, purchaseToken, userId } = req.body;
    const auth = new googleapis_1.google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: (_a = process.env.GOOGLE_PRIVATE_KEY) === null || _a === void 0 ? void 0 : _a.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/androidpublisher'],
    });
    const androidPublisher = googleapis_1.google.androidpublisher({
        version: 'v3',
        auth,
    });
    try {
        const subscriptionData = yield (0, subscription_service_1.getSubscriptionDataByuserId)(userId);
        const response = yield androidPublisher.purchases.subscriptions.cancel({
            packageName,
            subscriptionId,
            token: purchaseToken,
        });
        console.log('response', response);
        if (response.status === 200) {
            // Update Subscription Plan to Free Tier
            yield (0, subscription_service_1.updateSubscriptionData)({
                _id: (_b = subscriptionData === null || subscriptionData === void 0 ? void 0 : subscriptionData._id) === null || _b === void 0 ? void 0 : _b.toString(),
                tierId: subscription_1.FREE_TIER_ID,
                userId,
                startDate: new Date(),
                endDate: (0, date_1.getOneMonthAfterDate)(new Date()),
            });
            // Update User Storage
            const tierData = yield (0, profile_service_1.getTierDataById)(subscription_1.FREE_TIER_ID);
            const updateTierData = {
                storage: Number(tierData === null || tierData === void 0 ? void 0 : tierData.cloudStorage),
                unit: String(tierData === null || tierData === void 0 ? void 0 : tierData.cloudeStorageUnit),
                userId,
            };
            yield (0, user_service_1.updateUserStorageLimitData)(updateTierData);
            yield (0, user_service_1.createUserStorageLogsData)({ userId, storage: Number(tierData === null || tierData === void 0 ? void 0 : tierData.cloudStorage), unit: String(tierData === null || tierData === void 0 ? void 0 : tierData.cloudeStorageUnit), type: 'added', note: 'When updating subscription tier.' });
            // Update User Credit
            const userCreditData = yield (0, user_service_1.getUserCreditData)(userId);
            const creditCount = Number(userCreditData === null || userCreditData === void 0 ? void 0 : userCreditData.credit) + Number(tierData === null || tierData === void 0 ? void 0 : tierData.credit);
            yield (0, user_service_1.updateUserCreditData)({ userId, credit: Number(creditCount) });
            yield (0, user_service_1.createUserCreditLogsData)({ userId, creditBalance: Number(userCreditData === null || userCreditData === void 0 ? void 0 : userCreditData.credit), type: 'credited', note: 'When updating subscription tier.' });
            res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: subscription_1.SubscriptionApiSource.put.cancelSubscription.path });
        }
        else {
            console.error('Failed to cancel subscription:', response.data);
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({ success: false, message: 'Failed to cancel subscription.' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
});
exports.cancelSubscription = cancelSubscription;
