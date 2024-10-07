import mongoose, { Schema } from "mongoose";

const env = process.env;

const PdfFolderSchema = new Schema({
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
        required: true
    }
}, {timestamps: true})

const dbConnection = mongoose.connection.useDb(env.MONGODB_DATABASE ?? '');
export const PdfFolder = dbConnection.model('PdfFolder', PdfFolderSchema, 'PdfFolder');