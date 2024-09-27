import { Folder } from "../models/folder.model";
import { ImagesFolder } from "../models/imagesFolder.model";
import { IFolder, IImagesFolder } from "../types/folder";
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

export const getFolderData = async (userId: string) => {
    try {
        const result = await Folder.find({ userId: userId?.toString() });
        return result;
    } catch (err) {
        throw err;
    }
}

export const createImagesFolderData = async (data: IImagesFolder) => {
    try {
        const newData = new ImagesFolder(data);
        await newData.save();
    } catch (err) {
        throw err;
    }
}

export const updateImagesFolderData = async (updateData: IImagesFolder) => {
    try {
        const objectId = new ObjectId(updateData?._id?.toString());
        const result = await ImagesFolder.findByIdAndUpdate(objectId, updateData, {
            new: true,
            runValidators: true
        });
        return result;
    } catch (err) {
        throw err;
    }
}

export const getImagesFolderData = async (userId: string) => {
    try {
        const result = await ImagesFolder.find({ userId: userId?.toString() });
        return result;
    } catch (err) {
        throw err;
    }
}

export const deleteImagesFolderData = async (_id: string) => {
    try {
        const objectId = new ObjectId(_id?.toString());
        await ImagesFolder.deleteOne({ _id: objectId });
        return;
    } catch (err) {
        throw err;
    }
}