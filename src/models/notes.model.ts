import mongoose, { Schema } from "mongoose";

const env = process.env;

const NotesSchema = new Schema({
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
    note: {
        type: String,
    }
}, {timestamps: true})

const dbConnection = mongoose.connection.useDb(env.MONGODB_DATABASE ?? '');
export const Notes = dbConnection.model('Notes', NotesSchema, 'Notes');