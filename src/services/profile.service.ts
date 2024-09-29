import { User } from "../models/user.model";
import { IUser } from "../types/user";
import { ObjectId } from 'mongodb';

export const updateProfilePictureData = async (updateData: IUser) => {
    try {
        const objectId = new ObjectId(updateData?._id?.toString());
        const result = await User.findByIdAndUpdate(objectId, updateData, {
            new: true,
            runValidators: true
        });
        return result;
    } catch (err) {
        throw err;
    }
}

export const getUserById = async (_id: string) => {
    try {
        const objectId = new ObjectId(_id?.toString());
        const result = await User.findOne({ _id: objectId });
        return result?.toObject();
    } catch (err) {
        throw err;
    }
}