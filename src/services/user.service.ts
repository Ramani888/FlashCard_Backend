import { UserCredit } from "../models/userCredit.model";
import { UserCreditLogs } from "../models/userCreditLogs.model";
import { IUserCredit, IUserCreditLogs } from "../types/user";
import { ObjectId } from 'mongodb';

export const updateUserCreditData = async (updateData: IUserCredit) => {
    try {
        const result = await UserCredit.findOneAndUpdate(
            { userId: updateData?.userId },
            { $set: { credit: updateData?.credit }},
            { new: true, upsert: false }
        );
        return result;
    } catch (error) {
        throw error;
    }
}

export const getUserCreditData = async (userId: string) => {
    try {
        const result = await UserCredit.findOne({ userId: userId?.toString() });
        return result?.toObject();
    } catch (err) {
        throw err;
    }
}

export const createUserCreditData = async (data: IUserCredit) => {
    try {
        const newData = new UserCredit(data);
        await newData.save();
    } catch (err) {
        throw err;
    }
}

export const createUserCreditLogsData = async (data: IUserCreditLogs) => {
    try {
        const newData = new UserCreditLogs(data);
        await newData.save();
    } catch (err) {
        throw err;
    }
}