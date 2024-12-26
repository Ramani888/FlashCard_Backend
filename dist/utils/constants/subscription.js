"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FREE_TIER_ID = exports.USER_ALREADY_SUBSCRIBED = exports.SubscriptionApiSource = void 0;
exports.SubscriptionApiSource = {
    post: {
        createSubscription: { path: '/subscription', message: 'Subscription Created Successfully.' }
    },
    put: {
        updateSubscription: { path: '/subscription', message: 'Subscription Updated Successfully.' }
    }
};
exports.USER_ALREADY_SUBSCRIBED = 'User is already subscribed.';
exports.FREE_TIER_ID = '67071ee998a7cc35fc69856c';
