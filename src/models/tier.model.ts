import mongoose, { Schema } from "mongoose";

const env = process.env;

const TierSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    cloudStorage: {
        type: Number,
        required: true
    },
    credit: {
        type: Number,
        required: true
    },
    cloudeStorageUnit: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    points: {
        type: Array<String>
    },
    productId: {
        type: String
    }
}, {timestamps: true})

const dbConnection = mongoose.connection.useDb(env.MONGODB_DATABASE ?? '');
export const Tier = dbConnection.model('Tier', TierSchema, 'Tier');