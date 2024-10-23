import mongoose, { Schema } from "mongoose";

const env = process.env;

const UserCreditLogsSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    creditBalance: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    note: {
        type: String,
    }
}, {timestamps: true})

const dbConnection = mongoose.connection.useDb(env.MONGODB_DATABASE ?? '');
export const UserCreditLogs = dbConnection.model('UserCreditLogs', UserCreditLogsSchema, 'UserCreditLogs');