import mongoose, { Schema } from "mongoose";

const env = process.env;

const CardSchema = new Schema({
    top: {
        type: String,
        required: true
    },
    bottom: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    folderId: {
        type: String,
    },
    setId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    isBlur: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const dbConnection = mongoose.connection.useDb(env.MONGODB_DATABASE ?? '');
export const Card = dbConnection.model('Card', CardSchema, 'Card');