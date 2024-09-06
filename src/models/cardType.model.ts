import mongoose, { Schema } from "mongoose";

const env = process.env;

const CardTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
}, {timestamps: true})

const dbConnection = mongoose.connection.useDb(env.MONGODB_DATABASE ?? '');
export const CardType = dbConnection.model('CardType', CardTypeSchema, 'CardType');