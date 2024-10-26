import { Support } from "../models/support.model";
import { Tier } from "../models/tier.model";
import { User } from "../models/user.model";
import { UserCredit } from "../models/userCredit.model";
import { UserStorage } from "../models/userStorage.model";
import { ISupport, IUser } from "../types/user";
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

export const getSubscriptionData = async () => {
    try {
        const result = await Tier.find();
        return result;
    } catch (err) {
        throw err;
    }
}

export const updatePasswordData = async (updateData: IUser) => {
    try {
        const result = await User.findOneAndUpdate(
            { email: updateData?.email },
            { $set: { password: updateData?.password }},
            { new: true, upsert: false }
        );
        return result;
    } catch (err) {
        throw err;
    }
}

export const createSupportData = async (data: ISupport) => {
    try {
        const newData = new Support(data);
        await newData.save();
    } catch (err) {
        throw err;
    }
}

export const getProfileData = async (userId: string) => {
    try {
        const userCreditData = await UserCredit.findOne({ userId: userId });
        const userStorageData = await UserStorage.findOne({ userId: userId });
        return {
            userCreditData: userCreditData?.toObject(),
            userStorageData: userStorageData?.toObject()
        }
    } catch (err) {
        throw err;
    }
}