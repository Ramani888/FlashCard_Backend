import mongoose, { Schema } from "mongoose";

const env = process.env;

const UserCreditSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    credit: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const dbConnection = mongoose.connection.useDb(env.MONGODB_DATABASE ?? '');
export const UserCredit = dbConnection.model('UserCredit', UserCreditSchema, 'UserCredit');