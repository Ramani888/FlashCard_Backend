import { Folder } from "../models/folder.model";
import { ImagesFolder } from "../models/imagesFolder.model";
import { PdfFolder } from "../models/pdfFolder.model";
import { IFolder, IImagesFolder, IPdfFolder } from "../types/folder";
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

export const getFolderData = async (userId: string, search: string) => {
    try {
        let query;
        if (search) {
            const cleanedSearch = search.trim().replace(/\s+/g, ' ');
            if (cleanedSearch) {
                query = {
                    userId: userId?.toString(),
                    name: { $regex: cleanedSearch, $options: 'i' }
                }
            } else {
                query = {
                    userId: userId?.toString()
                }
            }
        } else {
            query = {
                userId: userId?.toString()
            }
        }
        const result = await Folder.find(query);
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

export const createPdfFolderData = async (data: IPdfFolder) => {
    try {
        const newData = new PdfFolder(data);
        await newData.save();
    } catch (err) {
        throw err;
    }
}

export const updatePdfFolderData = async (updateData: IPdfFolder) => {
    try {
        const objectId = new ObjectId(updateData?._id?.toString());
        const result = await PdfFolder.findByIdAndUpdate(objectId, updateData, {
            new: true,
            runValidators: true
        });
        return result;
    } catch (err) {
        throw err;
    }
}

export const getPdfFolderData = async (userId: string) => {
    try {
        const result = await PdfFolder.find({ userId: userId?.toString() });
        return result;
    } catch (err) {
        throw err;
    }
}

export const deletePdfFolderData = async (_id: string) => {
    try {
        const objectId = new ObjectId(_id?.toString());
        await PdfFolder.deleteOne({ _id: objectId });
        return;
    } catch (err) {
        throw err;
    }
}