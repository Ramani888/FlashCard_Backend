import { Pdf } from "../models/pdf.model";
import { IPdf } from "../types/pdf";
import { ObjectId } from 'mongodb';

export const uploadPdfData = async (data: IPdf) => {
    try {
        const newData = new Pdf(data);
        await newData.save();
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
        const result = await Pdf.find({ userId: userId?.toString() });
        return result;
    } catch (err) {
        throw err;
    }
}

export const getPdfDataByFolderId = async (userId: string, folderId: string) => {
    try {
        const result = await Pdf.find({ userId: userId?.toString(), folderId: folderId?.toString() });
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