import { Set } from "../models/set.models";
import { ISet } from "../types/set";
import { ObjectId } from 'mongodb';

export const insertSetData = async (data: ISet) => {
    try {
        const newData = new Set(data);
        await newData.save();
        return;
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

// export const getSetDataBycardTypeId = async (cardTypeId: string, userId: string) => {
//     try {
//         const result = await Set.find({ cardTypeId: cardTypeId?.toString(), userId: userId?.toString() });
//         return result;
//     } catch (err) {
//         throw err;
//     }
// }

export const getSetDataBycardTypeId = async (cardTypeId: string, userId: string) => {
    try {
        const result = await Set.find({
            cardTypeId: cardTypeId?.toString(),
            userId: userId?.toString(),
            $or: [
                { folderId: { $exists: false } },  // Documents where folderId does not exist
                { folderId: null }                 // Documents where folderId is null
            ]
        });
        return result;
    } catch (err) {
        throw err;
    }
}

// export const getSetDataByfolderId = async (folderId: string, cardTypeId: string, userId: string) => {
//     try {
//         const result = await Set.find({ folderId: folderId?.toString(), cardTypeId: cardTypeId?.toString(), userId: userId?.toString() });
//         return result;
//     } catch (err) {
//         throw err;
//     }
// }

export const getSetDataByfolderId = async (folderId: string, cardTypeId: string, userId: string) => {
    try {
        const result = await Set.find({
            cardTypeId: cardTypeId?.toString(),
            userId: userId?.toString(),
            $and: [
                { folderId: folderId?.toString() }, // Ensure that folderId matches the given value
                { folderId: { $exists: true, $ne: null } } // Check that folderId exists and is not null
            ]
        });
        return result;
    } catch (err) {
        throw err;
    }
}

export const getSetBySetId = async (setId: string) => {
    try {
        const objectId = new ObjectId(setId?.toString());
        const result = await Set.findOne({ _id: objectId });
        return result;
    } catch (err) {
        throw err;
    }
}
