import { UserSubscription } from "../models/userSubscription.model";
import { ISubscription } from "../types/subscription";
import { ObjectId } from 'mongodb';
import { USER_ALREADY_SUBSCRIBED } from "../utils/constants/subscription";

export const createSubscriptionData = async (data: ISubscription) => {
    try {
        const result = await UserSubscription.find({ userId: data?.userId?.toString() });
        
        if (result?.length > 0) {
            throw new Error(USER_ALREADY_SUBSCRIBED);
        }
        
        const newData = new UserSubscription(data);
        await newData.save();
    } catch (err) {
        throw err;
    }
}

export const updateSubscriptionData = async (updateData: ISubscription) => {
    try {
        const objectId = new ObjectId(updateData?._id?.toString());
        const result = await UserSubscription.findByIdAndUpdate(objectId, updateData, {
            new: true,
            runValidators: true
        });
        return result;
    } catch (err) {
        throw err;
    }
}

export const getSubscriptionDataByuserId = async (userId: string) => {
    try {
        const result = await UserSubscription?.findOne({ userId: userId });
        return result?.toObject();
    } catch (err) {
        throw err;
    }
}