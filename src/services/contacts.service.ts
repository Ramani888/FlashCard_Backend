import { User } from "../models/user.model";
import { ObjectId } from 'mongodb';
import { IContacts } from "../types/contacts";
import { Contacts } from "../models/contacts.model";

export const getUsersData = async (search: string, userId: string) => {
    try {
        const objectId = new ObjectId(userId?.toString());
        const cleanedSearch = search.trim().replace(/\s+/g, ' ');
        const users = await User.find({
            email: { $regex: cleanedSearch, $options: 'i' }, // Case-insensitive search for email
            _id: { $ne: objectId }  // Exclude the user with the given ObjectId
        });
        return users;
    } catch (err) {
        throw err;
    }
}

export const addContactData = async (data: IContacts) => {
    try {
        const newData = new Contacts(data);
        await newData.save();
    } catch (err) {
        throw err;
    }
}

export const getContactByUserIdAndContactUserId = async (userId: string, contactUserId: string) => {
    try {
        const result = await Contacts.findOne({ userId: userId?.toString(), contactUserId: contactUserId?.toString() });
        return result;
    } catch (err) {
        throw err;
    }
}

export const getContactByUserId = async (userId: string) => {
    try {
        const result = await Contacts.find({ userId: userId?.toString() });
        return result;
    } catch (err) {
        throw err;
    }
}

export const getContactsData = async (userId: string) => {
    try {
        const result = await Contacts.aggregate([
            {
                $match: {
                    userId: userId?.toString()
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
                    "email": "$userData.email",
                    "password": "$userData.password",
                    "picture": "$userData.picture",
                }
            }
        ]);        
        return result;
    } catch (err) {
        throw err;
    }
}

export const deleteContactsData = async (_id: string) => {
    try {
        const objectId = new ObjectId(_id?.toString());
        await Contacts.deleteOne({ _id: objectId });
        return;
    } catch (err) {
        throw err;
    }
}