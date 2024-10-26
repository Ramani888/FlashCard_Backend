import { Pdf } from "../models/pdf.model";
import { IPdf } from "../types/pdf";
import { ObjectId } from 'mongodb';

export const uploadPdfData = async (data: IPdf) => {
    try {
        const newData = new Pdf(data);
        const savedData = await newData.save();
        return savedData._id?.toString();
    } catch (err) {
        throw err;
    }
}

export const getPdfById = async (_id: string) => {
    try {
        const objectId = new ObjectId(_id?.toString());
        const result = await Pdf.findOne({ _id: objectId });
        return result?.toObject();
    } catch (err) {
        throw err;
    }
}

export const updatePdfData = async (updateData: IPdf) => {
    try {
        const objectId = new ObjectId(updateData?._id?.toString());
        const result = await Pdf.findByIdAndUpdate(objectId, updateData, {
            new: true,
            runValidators: true
        });
        return result;
    } catch (err) {
        throw err;
    }
}

export const getPdfData = async (userId: string) => {
    try {
        // const result = await Pdf.find({ userId: userId?.toString() });
        const result = await Pdf.aggregate([
            {
                $match: {
                    userId: userId?.toString()
                }
            },
            {
                $addFields: {
                    folderIdObject: { $toObjectId: "$folderId" }, 
                }
            },
            {
                $lookup: {
                    from: "PdfFolder",
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
                $project: {
                    "_id": 1,
                    "url": 1,
                    "folderId": 1,
                    "userId": 1,
                    "color": 1,
                    "name": 1,
                    "isHighlight": 1,
                    "createdAt": 1,
                    "updatedAt": 1,
                    "folderName": "$folderData.name",
                }
            }
        ])
        return result;
    } catch (err) {
        throw err;
    }
}

export const getPdfDataByFolderId = async (userId: string, folderId: string) => {
    try {
        // const result = await Pdf.find({ userId: userId?.toString(), folderId: folderId?.toString() });
        const result = await Pdf.aggregate([
            {
                $match: {
                    userId: userId?.toString(),
                    folderId: folderId?.toString()
                }
            },
            {
                $addFields: {
                    folderIdObject: { $toObjectId: "$folderId" }, 
                }
            },
            {
                $lookup: {
                    from: "PdfFolder",
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
                $project: {
                    "_id": 1,
                    "url": 1,
                    "folderId": 1,
                    "userId": 1,
                    "color": 1,
                    "name": 1,
                    "isHighlight": 1,
                    "createdAt": 1,
                    "updatedAt": 1,
                    "folderName": "$folderData.name",
                }
            }
        ])
        return result;
    } catch (err) {
        throw err;
    }
}

export const deletePdfData = async (_id: string) => {
    try {
        const objectId = new ObjectId(_id?.toString());
        await Pdf.deleteOne({ _id: objectId });
        return;
    } catch (err) {
        throw err;
    }
}