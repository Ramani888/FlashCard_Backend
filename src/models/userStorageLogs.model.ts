import mongoose, { Schema } from "mongoose";

const env = process.env;

const UserStorageLogsSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    documentId: {
        type: String,
    },
    storage: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    type: {
        type: String, // added, deleted, updated
        required: true
    },
    note: {
        type: String,
    }
}, {timestamps: true})

const dbConnection = mongoose.connection.useDb(env.MONGODB_DATABASE ?? '');
export const UserStorageLogs = dbConnection.model('UserStorageLogs', UserStorageLogsSchema, 'UserStorageLogs');