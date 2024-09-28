import { Images } from "../models/images.model";
import { IImages } from "../types/images";
import { ObjectId } from 'mongodb';

export const uploadImagesData = async (data: IImages) => {
    try {
        const newData = new Images(data);
        await newData.save();
    } catch (err) {
        throw err;
    }
}

export const getImagesById = async (_id: string) => {
    try {
        const objectId = new ObjectId(_id?.toString());
        const result = await Images.findOne({ _id: objectId });
        return result?.toObject();
    } catch (err) {
        throw err;
    }
}

export const updateImagesData = async (updateData: IImages) => {
    try {
        const objectId = new ObjectId(updateData?._id?.toString());
        const result = await Images.findByIdAndUpdate(objectId, updateData, {
            new: true,
            runValidators: true
        });
        return result;
    } catch (err) {
        throw err;
    }
}

export const getImagesData = async (userId: string) => {
    try {
        const result = await Images.find({ userId: userId?.toString() });
        return result;
    } catch (err) {
        throw err;
    }
}

export const getImagesDataByFolderId = async (userId: string, folderId: string) => {
    try {
        const result = await Images.find({ userId: userId?.toString(), folderId: folderId?.toString() });
        return result;
    } catch (err) {
        throw err;
    }
}

export const deleteImagesData = async (_id: string) => {
    try {
        const objectId = new ObjectId(_id?.toString());
        await Images.deleteOne({ _id: objectId });
        return;
    } catch (err) {
        throw err;
    }
}