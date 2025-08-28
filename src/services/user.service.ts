import { UserCredit } from "../models/userCredit.model";
import { UserCreditLogs } from "../models/userCreditLogs.model";
import { UserStorage } from "../models/userStorage.model";
import { UserStorageLogs } from "../models/userStorageLogs.model";
import { IUserCredit, IUserCreditLogs, IUserStorage, IUserStorageLogs } from "../types/user";
import { getDefaultSetData, insertSetData, insertSetDataIntoMultiLanguageCollection } from "./set.services";
import { getCardData, getDefaultCardData, insertCardDataIntoMultiLanguageCollection, insertManyCardData } from "./card.service";
import { translate } from "google-translate-api-x";
import { getCardCollectionName, getSetCollectionName } from "../utils/helpers/general";

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

export const createUserDefaultCards = async (newUserId: string, language: string) => {
    try {
        const defaultSetData = await getDefaultSetData(language);

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

            const cardData = await getDefaultCardData(language, set?._id?.toString() || '', set?.userId?.toString() || '');
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

export const addAutoTranslateSetsAndCardsData = async (language: string) => {
    try {
        const defaultSetData = await getDefaultSetData(language);

        console.log('defaultSetData', defaultSetData?.length)

        // Helper function to retry translation with delay
        const retryTranslate = async (text: string, to: string, maxRetries = 3, delay = 1000) => {
            let retries = 0;
            while (retries < maxRetries) {
                try {
                    return await translate(text, { to });
                } catch (translateError) {
                    retries++;
                    console.error(`Translation error (attempt ${retries}/${maxRetries}):`, translateError);
                    if (retries >= maxRetries) {
                        throw translateError; // Throw after max retries
                    }
                    // Wait before retrying
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
            // This should never be reached due to the throw above, but TypeScript needs it
            return { text };
        };

        for (const set of defaultSetData) {
            let setNameResult;
            try {
                setNameResult = await retryTranslate(set.name, language);
            } catch (translateError) {
                console.error('All translation attempts failed for set name:', translateError);
                setNameResult = { text: set.name }; // Use original name only after all retries fail
            }

            const setData = {
                name: setNameResult?.text ?? set.name,
                isPrivate: set.isPrivate,
                color: set.color,
                userId: set.userId,
                isHighlight: set.isHighlight,
                folderId: '',
                defaultAdded: true,
            }

            const setCollectionName = getSetCollectionName(language);

            const newSetId = await insertSetDataIntoMultiLanguageCollection(setData, setCollectionName);

            const cardData = await getCardData(set?._id?.toString() || '', set?.userId?.toString() || '');
            console.log('cardData', cardData?.length);

            // Translate each card field and handle promises in batches
            const translatedCardData = [];
            for (const card of cardData) {
                try {
                    // Translate top, bottom, and note with retry mechanism
                    const [topTranslation, bottomTranslation, noteTranslation] = await Promise.all([
                        retryTranslate(card.top, language),
                        retryTranslate(card.bottom, language),
                        card.note && card.note !== '' ? retryTranslate(card.note, language) : { text: '' }
                    ]);

                    translatedCardData.push({
                        top: topTranslation?.text ?? card.top,
                        bottom: bottomTranslation?.text ?? card.bottom,
                        isBlur: card.isBlur,
                        position: card.position,
                        userId: card.userId,
                        setId: newSetId?.toString(),
                        folderId: '',
                        defaultAdded: true,
                        note: noteTranslation?.text ?? (card.note === null ? '' : card.note)
                    });
                } catch (translateError) {
                    console.error('All translation attempts failed for card:', translateError);
                    // If all retries fail, add the original card without translation
                    translatedCardData.push({
                        top: card.top,
                        bottom: card.bottom,
                        isBlur: card.isBlur,
                        position: card.position,
                        userId: card.userId,
                        setId: newSetId?.toString(),
                        folderId: '',
                        defaultAdded: true,
                        note: card.note === null ? '' : card.note
                    });
                }
            }

            console.log('translatedCardData', translatedCardData?.length);

            const cardCollectionName = getCardCollectionName(language);

            if (translatedCardData?.length > 0) {
                await insertCardDataIntoMultiLanguageCollection(translatedCardData, cardCollectionName);
            }
        }

        return;
    } catch (error) {
        throw error;
    }
}