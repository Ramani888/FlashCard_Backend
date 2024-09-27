import mongoose, { Schema } from "mongoose";

const env = process.env;

const ImagesFolderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {timestamps: true})

const dbConnection = mongoose.connection.useDb(env.MONGODB_DATABASE ?? '');
export const ImagesFolder = dbConnection.model('ImagesFolder', ImagesFolderSchema, 'ImagesFolder');