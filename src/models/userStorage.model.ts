import mongoose, { Schema } from "mongoose";

const env = process.env;

const UserStorageSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    storage: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    coveredStorage: {
        type: Number,
        required: true
    },
    coveredStorageUnit: {
        type: String,
        required: true
    }
}, {timestamps: true})

const dbConnection = mongoose.connection.useDb(env.MONGODB_DATABASE ?? '');
export const UserStorage = dbConnection.model('UserStorage', UserStorageSchema, 'UserStorage');