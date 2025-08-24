import { UserCredit } from "../models/userCredit.model";
import { UserCreditLogs } from "../models/userCreditLogs.model";
import { UserStorage } from "../models/userStorage.model";
import { UserStorageLogs } from "../models/userStorageLogs.model";
import { IUserCredit, IUserCreditLogs, IUserStorage, IUserStorageLogs } from "../types/user";
import { ObjectId } from 'mongodb';
import { getDefaultSetData, insertSetData } from "./set.services";
import { getCardData, insertManyCardData } from "./card.service";

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

export const createUserStorageData = async (data: IUserStorage) => {
    try {
        const newData = new UserStorage(data);
        await newData.save();
    } catch (err) {
        throw err;
    }
}

export const createUserStorageLogsData = async (data: IUserStorageLogs) => {
    try {
        const newData = new UserStorageLogs(data);
        await newData.save();
    } catch (err) {
        throw err;
    }
}

export const getUserStorageData = async (userId: string) => {
    try {
        const result = await UserStorage.findOne({ userId: userId?.toString() });
        return result?.toObject();
    } catch (err) {
        throw err;
    }
}

export const updateUserStorageData = async (updateData: IUserStorage) => {
    try {
        const result = await UserStorage.findOneAndUpdate(
            { userId: updateData?.userId },
            { $set: { coveredStorage: updateData?.coveredStorage, coveredStorageUnit: updateData?.coveredStorageUnit }},
            { new: true, upsert: false }
        );
        return result;
    } catch (error) {
        throw error;
    }
}

export const updateUserStorageLimitData = async (updateData: IUserStorage) => {
    try {
        const result = await UserStorage.findOneAndUpdate(
            { userId: updateData?.userId },
            { $set: { storage: updateData?.storage, unit: updateData?.unit } },
            { new: true, upsert: false }
        )
        return result;
    } catch (error) {
        throw error;
    }    
}

export const createUserDefaultCards = async (newUserId: string) => {
    try {
        const defaultSetData = await getDefaultSetData();

        for (const set of defaultSetData) {
            const setData = {
                name: set.name,
                isPrivate: set.isPrivate,
                color: set.color,
                userId: newUserId,
                isHighlight: set.isHighlight,
                folderId: '',
                defaultAdded: true
            }

            const newSetId = await insertSetData(setData);

            const cardData = await getCardData(set?._id?.toString() || '', set?.userId?.toString() || '');
            const newCardData = cardData.map(card => ({
                top: card.top,
                bottom: card.bottom,
                isBlur: card.isBlur,
                position: card.position,
                userId: newUserId,
                setId: newSetId.toString(),
                folderId: '',
                defaultAdded: true,
                note: card.note === null ? '' : card.note
            }));

            if (newCardData?.length > 0) {
                await insertManyCardData(newCardData);
            }

        }

        return;
    } catch (error) {
        throw error;
    }
}