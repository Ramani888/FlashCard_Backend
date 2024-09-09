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

export const getSetDataBycardTypeId = async (cardTypeId: string, userId: string) => {
    try {
        const result = await Set.find({ cardTypeId: cardTypeId?.toString(), userId: userId?.toString() });
        return result;
    } catch (err) {
        throw err;
    }
}

export const getSetDataByfolderId = async (folderId: string, cardTypeId: string, userId: string) => {
    try {
        const result = await Set.find({ folderId: folderId?.toString(), cardTypeId: cardTypeId?.toString(), userId: userId?.toString() });
        return result;
    } catch (err) {
        throw err;
    }
}