import { Set } from "../models/set.models";

export const getMediatorSetData = async (userId: string) => {
    try {
        // const result = await Set.find({ userId: userId?.toString(), isPrivate: false })

        const query = {
            userId: userId?.toString(),
            isPrivate: false
        }
        const result = await Set.aggregate([
            {
                $match: query
            },
            {
                $addFields: {
                    folderIdObject: { $toObjectId: "$folderId" }, // Convert folderId to ObjectId
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
                    path: "$folderData", // Unwind to make folderData a single object
                    preserveNullAndEmptyArrays: true // Keep the original document if no match is found
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
                    "isPrivate": 1,
                    "color": 1,
                    "userId": 1,
                    "folderId": 1,
                    "createdAt": 1,
                    "updatedAt": 1,
                    "isHighlight": 1,
                    "folderName": "$folderData.name", // Correctly reference folderData to get folderName
                    "cardCount": 1 // Include card count in the final projection
                }
            }
        ]); 
        return result;
    } catch (err) {
        throw err;
    }
}