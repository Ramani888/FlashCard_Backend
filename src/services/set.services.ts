import { Set } from "../models/set.models";
import { ISet } from "../types/set";
import { ObjectId } from 'mongodb';
import { defaultUserId } from "../utils/constants/user";
import mongoose from 'mongoose';
import { LanguageCode } from "../utils/constants/general";
import { DefaultSetName } from "../utils/constants/set";
import { getSetCollectionName } from "../utils/helpers/general";

export const insertSetData = async (data: ISet) => {
    try {
        const newData = new Set(data);
        const savedData = await newData.save(); // Save the new data
        return savedData?._id; // Return the _id of the saved document
    } catch (err) {
        throw err;
    }
}

export const insertSetDataIntoMultiLanguageCollection = async (data: ISet, collectionName: string) => {
    try {
        const dbName = process.env.MONGODB_DATABASE || 'FlashCard';
        const db = mongoose.connection.useDb(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(data);
        return result.insertedId;
    } catch (err) {
        throw err;
    }
}

export const updateSetData = async (updateData: ISet) => {
    try {
        const objectId = new ObjectId(updateData?._id?.toString());
        const result = await Set.findByIdAndUpdate(objectId, updateData, {
            new: true,
            runValidators: true
        });
        return result;
    } catch (err) {
        throw err;
    }
};

export const deleteSetData = async (_id: string) => {
    try {
        const objectId = new ObjectId(_id?.toString());
        await Set.deleteOne({ _id: objectId });
        return;
    } catch (err) {
        throw err;
    }
}

export const getSetData = async (userId: string, search: string) => {
    try {
        let query;
        if (search) {
            const cleanedSearch = search.trim().replace(/\s+/g, ' ');
            if (cleanedSearch) {
                query = {
                    userId: userId?.toString(),
                    name: { $regex: cleanedSearch, $options: 'i' }
                };
            } else {
                query = {
                    userId: userId?.toString()
                };
            }
        } else {
            query = {
                userId: userId?.toString()
            };
        }

        const result = await Set.aggregate([
            {
                $match: query
            },
            {
                $addFields: {
                    folderIdObject: {
                        $cond: [
                            {
                                $and: [
                                    { $ne: [{ $ifNull: ["$folderId", ""] }, ""] },
                                    { $eq: [{ $strLenCP: { $ifNull: ["$folderId", ""] } }, 24] }
                                ]
                            },
                            { $toObjectId: "$folderId" },
                            null
                        ]
                    }
                }
            },
            {
                $lookup: {
                    from: "Folder",
                    localField: "folderIdObject",
                    foreignField: "_id",
                    as: "folderData"
                }
            },
            {
                $unwind: {
                    path: "$folderData",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    setIdString: { $toString: "$_id" }
                }
            },
            {
                $lookup: {
                    from: "Card",
                    localField: "setIdString",
                    foreignField: "setId",
                    as: "cards"
                }
            },
            {
                $addFields: {
                    cardCount: { $size: "$cards" }
                }
            },
            {
                $project: {
                    "_id": 1,
                    "name": 1,
                    "color": 1,
                    "userId": 1,
                    "folderId": 1,
                    "createdAt": 1,
                    "updatedAt": 1,
                    "isHighlight": 1,
                    "defaultAdded": 1,
                    "folderName": "$folderData.name",
                    "cardCount": 1
                }
            }
        ]);

        return result;
    } catch (err) {
        throw err;
    }
};




// export const getSetData = async (userId: string) => {
//     try {
//         const result = await Set.find({
//             userId: userId?.toString(),
//             $or: [
//                 { folderId: { $exists: false } },  // Documents where folderId does not exist
//                 { folderId: null }                 // Documents where folderId is null
//             ]
//         });
//         return result;
//     } catch (err) {
//         throw err;
//     }
// }

// export const getSetDataByfolderId = async (folderId: string, cardTypeId: string, userId: string) => {
//     try {
//         const result = await Set.find({ folderId: folderId?.toString(), cardTypeId: cardTypeId?.toString(), userId: userId?.toString() });
//         return result;
//     } catch (err) {
//         throw err;
//     }
// }

export const getSetDataByfolderId = async (folderId: string, userId: string, search: string) => {
    try {
        let query;
        if (search) {
            const cleanedSearch = search.trim().replace(/\s+/g, ' ');
            if (cleanedSearch) {
                query = {
                    userId: userId?.toString(),
                    folderId: { $exists: true, $ne: null, $eq: folderId?.toString() },
                    name: { $regex: cleanedSearch, $options: 'i' }
                }
            } else {
                query = {
                    userId: userId?.toString(),
                    folderId: { $exists: true, $ne: null, $eq: folderId?.toString() }
                }
            }
        } else {
            query = {
                userId: userId?.toString(),
                folderId: { $exists: true, $ne: null, $eq: folderId?.toString() }
            }
        }
        
        const result = await Set.aggregate([
            {
                $match: query
            },
            {
                $addFields: {
                    folderIdObject: { $toObjectId: "$folderId" } // Convert folderId to ObjectId
                }
            },
            {
                $lookup: {
                    from: "Folder",
                    localField: "folderIdObject",
                    foreignField: "_id",
                    as: "folderData"
                }
            },
            {
                $unwind: {
                    path: "$folderData",
                    preserveNullAndEmptyArrays: true // Keep the set document even if no matching folder is found
                }
            },
            {
                $addFields: {
                    setIdString: { $toString: "$_id" } // Convert ObjectId to string for matching
                }
            },
            {
                $lookup: {
                    from: "Card", // Assuming 'Card' collection stores cards linked to sets
                    localField: "setIdString", // Use the string version of _id to find matching cards
                    foreignField: "setId", // Assuming 'setId' in the Card collection is a string
                    as: "cards" // Name the array with cards found
                }
            },
            {
                $addFields: {
                    cardCount: { $size: "$cards" } // Get the count of cards per set
                }
            },
            {
                $project: {
                    "_id": 1,
                    "name": 1,
                    "color": 1,
                    "userId": 1,
                    "folderId": 1,
                    "createdAt": 1,
                    "updatedAt": 1,
                    "isHighlight": 1,
                    "defaultAdded": 1,
                    "folderName": "$folderData.name", // Extract folderName from folderData
                    "cardCount": 1 // Include card count in the final projection
                }
            }
        ]);
        return result;
    } catch (err) {
        throw err;
    }
}

export const getSetBySetId = async (setId: string) => {
    try {
        const objectId = new ObjectId(setId?.toString());
        const result = await Set.findOne({ _id: objectId });
        return result?.toObject();
    } catch (err) {
        throw err;
    }
}

export const getDefaultSetData = async (language: string) => {
    try {
        const setName = getSetCollectionName(language);
        const dbName = process.env.MONGODB_DATABASE || 'FlashCard';
        const db = mongoose.connection.useDb(dbName);
        const result = await db.collection(setName).find({ }).toArray();
        return result;

    } catch (err) {
        throw err;
    }
}