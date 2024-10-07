import mongoose, { Schema } from "mongoose";

const env = process.env;

const SetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isPrivate: {
        type: Boolean,
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
    folderId: {
        type: String
    },
    isHighlight: {
        type: Boolean,
        required: true
    }
}, {timestamps: true})

const dbConnection = mongoose.connection.useDb(env.MONGODB_DATABASE ?? '');
export const Set = dbConnection.model('Set', SetSchema, 'Set');