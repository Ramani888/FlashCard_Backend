import mongoose, { Schema } from "mongoose";

const env = process.env;

const ContactsSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    contactUserId: {
        type: String,
        required: true
    }
}, {timestamps: true})

const dbConnection = mongoose.connection.useDb(env.MONGODB_DATABASE ?? '');
export const Contacts = dbConnection.model('Contacts', ContactsSchema, 'Contacts');