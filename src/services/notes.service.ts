import { Notes } from "../models/notes.model";
import { INotes } from "../types/notes";
import { ObjectId } from 'mongodb';

export const createNotesData = async (data: INotes) => {
    try {
        const newData = new Notes(data);
        await newData.save();
    } catch (err) {
        throw err;
    }
}

export const updateNotesData = async (updateData: INotes) => {
    try {
        const objectId = new ObjectId(updateData?._id?.toString());
        const result = await Notes.findByIdAndUpdate(objectId, updateData, {
            new: true,
            runValidators: true
        });
        return result;
    } catch (err) {
        throw err;
    }
}

export const deleteNotesData = async (_id: string) => {
    try {
        const objectId = new ObjectId(_id?.toString());
        await Notes.deleteOne({ _id: objectId });
        return;
    } catch (err) {
        throw err;
    }
}

export const getNotesData = async (userId: string) => {
    try {
        const result = await Notes.find({ userId: userId?.toString() });
        return result;
    } catch (err) {
        throw err;
    }
}