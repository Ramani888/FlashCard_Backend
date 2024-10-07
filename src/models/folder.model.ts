import mongoose, { Schema } from "mongoose";

const env = process.env;

const FolderSchema = new Schema({
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
    },
    isHighlight: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const dbConnection = mongoose.connection.useDb(env.MONGODB_DATABASE ?? '');
export const Folder = dbConnection.model('Folder', FolderSchema, 'Folder');