"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelSubscriptionValidation = exports.updateSubscriptionValidation = exports.createSubscriptionValidation = void 0;
exports.createSubscriptionValidation = {
    productId: 'string',
    tierId: 'required|string',
    userId: 'required|string',
    startDate: 'required|date',
    endDate: 'date'
};
exports.updateSubscriptionValidation = {
    _id: 'required|string',
    productId: 'string',
    tierId: 'required|string',
    userId: 'required|string',
    startDate: 'required|date',
    endDate: 'date'
};
exports.cancelSubscriptionValidation = {
    packageName: 'required|string',
    subscriptionId: 'required|string',
    purchaseToken: 'required|string',
    userId: 'required|string'
};
