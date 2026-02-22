import mongoose, { Schema } from "mongoose";

const env = process.env;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    },
    isPrivacy: {
        type: Boolean,
        required: true
    }
}, {timestamps: true})

const dbConnection = mongoose.connection.useDb(env.MONGODB_DATABASE ?? '');
export const User = dbConnection.model('User', UserSchema, 'User');