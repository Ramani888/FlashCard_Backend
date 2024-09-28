import mongoose, { Schema } from "mongoose";

const env = process.env;

const ImagesSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    folderId: {
        type: String
    },
    userId: {
        type: String,
        required: true
    }
}, {timestamps: true})

const dbConnection = mongoose.connection.useDb(env.MONGODB_DATABASE ?? '');
export const Images = dbConnection.model('Images', ImagesSchema, 'Images');