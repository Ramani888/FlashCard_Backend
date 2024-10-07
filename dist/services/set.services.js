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
exports.getSetBySetId = exports.getSetDataByfolderId = exports.getSetData = exports.deleteSetData = exports.updateSetData = exports.insertSetData = void 0;
const set_models_1 = require("../models/set.models");
const mongodb_1 = require("mongodb");
const insertSetData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = new set_models_1.Set(data);
        yield newData.save();
        return;
    }
    catch (err) {
        throw err;
    }
});
exports.insertSetData = insertSetData;
const updateSetData = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const objectId = new mongodb_1.ObjectId((_a = updateData === null || updateData === void 0 ? void 0 : updateData._id) === null || _a === void 0 ? void 0 : _a.toString());
        const result = yield set_models_1.Set.findByIdAndUpdate(objectId, updateData, {
            new: true,
            runValidators: true
        });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.updateSetData = updateSetData;
const deleteSetData = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongodb_1.ObjectId(_id === null || _id === void 0 ? void 0 : _id.toString());
        yield set_models_1.Set.deleteOne({ _id: objectId });
        return;
    }
    catch (err) {
        throw err;
    }
});
exports.deleteSetData = deleteSetData;
const getSetData = (userId, search) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query;
        if (search) {
            const cleanedSearch = search.trim().replace(/\s+/g, ' ');
            if (cleanedSearch) {
                query = {
                    userId: userId === null || userId === void 0 ? void 0 : userId.toString(),
                    name: { $regex: cleanedSearch, $options: 'i' }
                };
            }
            else {
                query = {
                    userId: userId === null || userId === void 0 ? void 0 : userId.toString()
                };
            }
        }
        else {
            query = {
                userId: userId === null || userId === void 0 ? void 0 : userId.toString()
            };
        }
        const result = yield set_models_1.Set.aggregate([
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
    }
    catch (err) {
        throw err;
    }
});
exports.getSetData = getSetData;
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
const getSetDataByfolderId = (folderId, userId, search) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query;
        if (search) {
            const cleanedSearch = search.trim().replace(/\s+/g, ' ');
            if (cleanedSearch) {
                query = {
                    userId: userId === null || userId === void 0 ? void 0 : userId.toString(),
                    folderId: { $exists: true, $ne: null, $eq: folderId === null || folderId === void 0 ? void 0 : folderId.toString() },
                    name: { $regex: cleanedSearch, $options: 'i' }
                };
            }
            else {
                query = {
                    userId: userId === null || userId === void 0 ? void 0 : userId.toString(),
                    folderId: { $exists: true, $ne: null, $eq: folderId === null || folderId === void 0 ? void 0 : folderId.toString() }
                };
            }
        }
        else {
            query = {
                userId: userId === null || userId === void 0 ? void 0 : userId.toString(),
                folderId: { $exists: true, $ne: null, $eq: folderId === null || folderId === void 0 ? void 0 : folderId.toString() }
            };
        }
        const result = yield set_models_1.Set.aggregate([
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
                    "isPrivate": 1,
                    "color": 1,
                    "userId": 1,
                    "folderId": 1,
                    "createdAt": 1,
                    "updatedAt": 1,
                    "isHighlight": 1,
                    "folderName": "$folderData.name", // Extract folderName from folderData
                    "cardCount": 1 // Include card count in the final projection
                }
            }
        ]);
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.getSetDataByfolderId = getSetDataByfolderId;
const getSetBySetId = (setId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongodb_1.ObjectId(setId === null || setId === void 0 ? void 0 : setId.toString());
        const result = yield set_models_1.Set.findOne({ _id: objectId });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.getSetBySetId = getSetBySetId;
