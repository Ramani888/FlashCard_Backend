export interface ISubscription {
    _id?: ObjectId;
    productId?: string;
    tierId: string;
    userId: string;
    startDate: date;
    endDate: date;
}