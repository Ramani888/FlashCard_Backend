import mongoose, { Schema } from "mongoose";

const env = process.env;

const TempUserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    isPrivacy: {
        type: Boolean,
        required: true
    },
    otpTimeOut: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const dbConnection = mongoose.connection.useDb(env.MONGODB_DATABASE ?? '');
export const TempUser = dbConnection.model('TempUser', TempUserSchema, 'TempUser');