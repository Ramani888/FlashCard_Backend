import mongoose, { Schema } from "mongoose";

const env = process.env;

const SupportSchema = new Schema({
    supportType: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
}, {timestamps: true})

const dbConnection = mongoose.connection.useDb(env.MONGODB_DATABASE ?? '');
export const Support = dbConnection.model('Support', SupportSchema, 'Support');