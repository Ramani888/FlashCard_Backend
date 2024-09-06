import { Folder } from "../models/folder.model";
import { IFolder } from "../types/folder";
import { ObjectId } from 'mongodb';

export const createFolderData = async (data: IFolder) => {
    try {
        const newData = new Folder(data);
        await newData.save();
    } catch (err) {
       throw err;
    }
}

export const updateFolderData = async (updateData: IFolder) => {
    try {
        const objectId = new ObjectId(updateData?._id?.toString());
        const result = await Folder.findByIdAndUpdate(objectId, updateData, {
            new: true,
            runValidators: true
        });
        return result;
    } catch (err) {
        throw err;
    }
}

export const deleteFolderData = async (_id: string) => {
    try {
        const objectId = new ObjectId(_id?.toString());
        await Folder.deleteOne({ _id: objectId });
        return;
    } catch (err) {
        throw err;
    }
}

export const getFolderDataBycardTypeId = async (cardTypeId: string, userId: string) => {
    try {
        const result = await Folder.find({ cardTypeId: cardTypeId?.toString(), userId: userId?.toString() });
        return result;
    } catch (err) {
        throw err;
    }
}