"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContactsData = exports.getContactsData = exports.getContactByUserId = exports.getContactByUserIdAndContactUserId = exports.addContactData = exports.getUsersData = void 0;
const user_model_1 = require("../models/user.model");
const mongodb_1 = require("mongodb");
const contacts_model_1 = require("../models/contacts.model");
const getUsersData = (search, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongodb_1.ObjectId(userId === null || userId === void 0 ? void 0 : userId.toString());
        const cleanedSearch = search.trim().replace(/\s+/g, ' ');
        const users = yield user_model_1.User.find({
            userName: { $regex: cleanedSearch, $options: 'i' }, // Case-insensitive search for userName
            _id: { $ne: objectId } // Exclude the user with the given ObjectId
        });
        return users;
    }
    catch (err) {
        throw err;
    }
});
exports.getUsersData = getUsersData;
const addContactData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = new contacts_model_1.Contacts(data);
        yield newData.save();
    }
    catch (err) {
        throw err;
    }
});
exports.addContactData = addContactData;
const getContactByUserIdAndContactUserId = (userId, contactUserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield contacts_model_1.Contacts.findOne({ userId: userId === null || userId === void 0 ? void 0 : userId.toString(), contactUserId: contactUserId === null || contactUserId === void 0 ? void 0 : contactUserId.toString() });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.getContactByUserIdAndContactUserId = getContactByUserIdAndContactUserId;
const getContactByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield contacts_model_1.Contacts.find({ userId: userId === null || userId === void 0 ? void 0 : userId.toString() });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.getContactByUserId = getContactByUserId;
const getContactsData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield contacts_model_1.Contacts.aggregate([
            {
                $match: {
                    userId: userId === null || userId === void 0 ? void 0 : userId.toString()
                }
            },
            {
                $addFields: {
                    contactUserIdObject: { $toObjectId: "$contactUserId" },
                }
            },
            {
                $lookup: {
                    from: "User",
                    localField: "contactUserIdObject",
                    foreignField: "_id",
                    as: "userData"
                }
            },
            {
                $unwind: {
                    path: "$userData", // Unwind to make folderData a single object
                    preserveNullAndEmptyArrays: true // Keep the original document if no match is found
                }
            },
            {
                $project: {
                    "_id": 1,
                    "userId": 1,
                    "contactUserId": 1,
                    "createdAt": 1,
                    "updatedAt": 1,
                    "userName": "$userData.userName",
                    "email": "$userData.email",
                    "password": "$userData.password"
                }
            }
        ]);
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.getContactsData = getContactsData;
const deleteContactsData = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongodb_1.ObjectId(_id === null || _id === void 0 ? void 0 : _id.toString());
        yield contacts_model_1.Contacts.deleteOne({ _id: objectId });
        return;
    }
    catch (err) {
        throw err;
    }
});
exports.deleteContactsData = deleteContactsData;
