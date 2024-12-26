export const createSubscriptionValidation = {
    productId: 'string',
    tierId: 'required|string',
    userId: 'required|string',
    startDate: 'required|date',
    endDate: 'date'
};

export const updateSubscriptionValidation = {
    _id: 'required|string',
    productId: 'string',
    tierId: 'required|string',
    userId: 'required|string',
    startDate: 'required|date',
    endDate: 'date'
};