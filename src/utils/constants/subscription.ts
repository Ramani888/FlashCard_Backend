export const SubscriptionApiSource = {
    post: {
        createSubscription: { path: '/subscription', message: 'Subscription Created Successfully.' },
    },
    put: {
        updateSubscription: { path: '/subscription', message: 'Subscription Updated Successfully.' },
        cancelSubscription: { path: '/cancel/subscription', message: 'Subscription Cancelled Successfully.' }
    }
}

export const USER_ALREADY_SUBSCRIBED = 'User is already subscribed.';
export const FREE_TIER_ID = '67071ee998a7cc35fc69856c';