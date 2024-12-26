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
exports.updateSubscription = exports.createSubscription = void 0;
const http_status_codes_1 = require("http-status-codes");
const subscription_1 = require("../utils/constants/subscription");
const subscription_service_1 = require("../services/subscription.service");
const date_1 = require("../utils/helpers/date");
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
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: subscription_1.SubscriptionApiSource.put.updateSubscription.message });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.updateSubscription = updateSubscription;
