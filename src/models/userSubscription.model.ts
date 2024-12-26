import mongoose, { Schema } from "mongoose";

const env = process.env;

const UserSubscriptionSchema = new Schema({
    productId: {
        type: String
    },
    tierId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
}, {timestamps: true})

const dbConnection = mongoose.connection.useDb(env.MONGODB_DATABASE ?? '');
export const UserSubscription = dbConnection.model('UserSubscription', UserSubscriptionSchema, 'UserSubscription');