import { UserCredit } from "../models/userCredit.model";
import { UserCreditLogs } from "../models/userCreditLogs.model";
import { UserStorage } from "../models/userStorage.model";
import { UserStorageLogs } from "../models/userStorageLogs.model";
import { User } from "../models/user.model";
import { Card } from "../models/card.model";
import { Set } from "../models/set.models";
import { Folder } from "../models/folder.model";
import { ImagesFolder } from "../models/imagesFolder.model";
import { PdfFolder } from "../models/pdfFolder.model";
import { Images } from "../models/images.model";
import { Pdf } from "../models/pdf.model";
import { Notes } from "../models/notes.model";
import { Contacts } from "../models/contacts.model";
import { Support } from "../models/support.model";
import { UserSubscription } from "../models/userSubscription.model";
import { IUserCredit, IUserCreditLogs, IUserStorage, IUserStorageLogs } from "../types/user";
import { getDefaultSetData, insertSetData, insertSetDataIntoMultiLanguageCollection } from "./set.services";
import { getCardData, getDefaultCardData, insertCardDataIntoMultiLanguageCollection, insertManyCardData } from "./card.service";
import { translate } from "google-translate-api-x";
import { getCardCollectionName, getSetCollectionName } from "../utils/helpers/general";
import { deleteFromS3 } from "../routes/uploadConfig";
import { FLASHCARD_IMAGES_V1_BUCKET_NAME, FLASHCARD_PDF_V1_BUCKET_NAME, FLASHCARD_SUPPORT_V1_BUCKET_NAME } from "../utils/constants/general";

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

export const deleteUserAccount = async (userId: string) => {
    try {
        // First, fetch all S3 file URLs that need to be deleted
        const [userData, userImages, userPdfs, userSupports] = await Promise.all([
            User.findById(userId),
            Images.find({ userId: userId }),
            Pdf.find({ userId: userId }),
            Support.find({ userId: userId })
        ]);

        // Collect all S3 URLs to delete
        const s3DeletionPromises: Promise<void>[] = [];

        // Delete user's profile picture from S3
        if (userData?.picture) {
            s3DeletionPromises.push(
                deleteFromS3(userData.picture, FLASHCARD_IMAGES_V1_BUCKET_NAME)
                    .catch(err => console.error('Error deleting profile picture:', err))
            );
        }

        // Delete all user's images from S3
        userImages.forEach(image => {
            if (image.url) {
                s3DeletionPromises.push(
                    deleteFromS3(image.url, FLASHCARD_IMAGES_V1_BUCKET_NAME)
                        .catch(err => console.error('Error deleting image:', err))
                );
            }
        });

        // Delete all user's PDFs from S3
        userPdfs.forEach(pdf => {
            if (pdf.url) {
                s3DeletionPromises.push(
                    deleteFromS3(pdf.url, FLASHCARD_PDF_V1_BUCKET_NAME)
                        .catch(err => console.error('Error deleting PDF:', err))
                );
            }
        });

        // Delete all user's support images from S3
        userSupports.forEach(support => {
            if (support.image) {
                s3DeletionPromises.push(
                    deleteFromS3(support.image, FLASHCARD_SUPPORT_V1_BUCKET_NAME)
                        .catch(err => console.error('Error deleting support image:', err))
                );
            }
        });

        // Wait for all S3 deletions to complete
        await Promise.all(s3DeletionPromises);

        // Now delete all user-related data from all database collections
        await Promise.all([
            // Delete user's cards
            Card.deleteMany({ userId: userId }),
            
            // Delete user's sets
            Set.deleteMany({ userId: userId }),
            
            // Delete user's folders
            Folder.deleteMany({ userId: userId }),
            
            // Delete user's image folders
            ImagesFolder.deleteMany({ userId: userId }),
            
            // Delete user's pdf folders
            PdfFolder.deleteMany({ userId: userId }),
            
            // Delete user's images
            Images.deleteMany({ userId: userId }),
            
            // Delete user's pdfs
            Pdf.deleteMany({ userId: userId }),
            
            // Delete user's notes
            Notes.deleteMany({ userId: userId }),
            
            // Delete user's contacts (both as user and as contact)
            Contacts.deleteMany({ $or: [{ userId: userId }, { contactUserId: userId }] }),
            
            // Delete user's support tickets
            Support.deleteMany({ userId: userId }),
            
            // Delete user's subscription
            UserSubscription.deleteMany({ userId: userId }),
            
            // Delete user's credit data
            UserCredit.deleteMany({ userId: userId }),
            
            // Delete user's credit logs
            UserCreditLogs.deleteMany({ userId: userId }),
            
            // Delete user's storage data
            UserStorage.deleteMany({ userId: userId }),
            
            // Delete user's storage logs
            UserStorageLogs.deleteMany({ userId: userId }),
            
            // Finally, delete the user account
            User.findByIdAndDelete(userId)
        ]);

        return;
    } catch (error) {
        throw error;
    }
}