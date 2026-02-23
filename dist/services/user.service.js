"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserAccount = exports.addAutoTranslateSetsAndCardsData = exports.createUserDefaultCards = exports.updateUserStorageLimitData = exports.updateUserStorageData = exports.getUserStorageData = exports.createUserStorageLogsData = exports.createUserStorageData = exports.createUserCreditLogsData = exports.createUserCreditData = exports.getUserCreditData = exports.updateUserCreditData = void 0;
const userCredit_model_1 = require("../models/userCredit.model");
const userCreditLogs_model_1 = require("../models/userCreditLogs.model");
const userStorage_model_1 = require("../models/userStorage.model");
const userStorageLogs_model_1 = require("../models/userStorageLogs.model");
const user_model_1 = require("../models/user.model");
const card_model_1 = require("../models/card.model");
const set_models_1 = require("../models/set.models");
const folder_model_1 = require("../models/folder.model");
const imagesFolder_model_1 = require("../models/imagesFolder.model");
const pdfFolder_model_1 = require("../models/pdfFolder.model");
const images_model_1 = require("../models/images.model");
const pdf_model_1 = require("../models/pdf.model");
const notes_model_1 = require("../models/notes.model");
const contacts_model_1 = require("../models/contacts.model");
const support_model_1 = require("../models/support.model");
const userSubscription_model_1 = require("../models/userSubscription.model");
const set_services_1 = require("./set.services");
const card_service_1 = require("./card.service");
const google_translate_api_x_1 = require("google-translate-api-x");
const general_1 = require("../utils/helpers/general");
const uploadConfig_1 = require("../routes/uploadConfig");
const general_2 = require("../utils/constants/general");
const updateUserCreditData = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userCredit_model_1.UserCredit.findOneAndUpdate({ userId: updateData === null || updateData === void 0 ? void 0 : updateData.userId }, { $set: { credit: updateData === null || updateData === void 0 ? void 0 : updateData.credit } }, { new: true, upsert: false });
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.updateUserCreditData = updateUserCreditData;
const getUserCreditData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userCredit_model_1.UserCredit.findOne({ userId: userId === null || userId === void 0 ? void 0 : userId.toString() });
        return result === null || result === void 0 ? void 0 : result.toObject();
    }
    catch (err) {
        throw err;
    }
});
exports.getUserCreditData = getUserCreditData;
const createUserCreditData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = new userCredit_model_1.UserCredit(data);
        yield newData.save();
    }
    catch (err) {
        throw err;
    }
});
exports.createUserCreditData = createUserCreditData;
const createUserCreditLogsData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = new userCreditLogs_model_1.UserCreditLogs(data);
        yield newData.save();
    }
    catch (err) {
        throw err;
    }
});
exports.createUserCreditLogsData = createUserCreditLogsData;
const createUserStorageData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = new userStorage_model_1.UserStorage(data);
        yield newData.save();
    }
    catch (err) {
        throw err;
    }
});
exports.createUserStorageData = createUserStorageData;
const createUserStorageLogsData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = new userStorageLogs_model_1.UserStorageLogs(data);
        yield newData.save();
    }
    catch (err) {
        throw err;
    }
});
exports.createUserStorageLogsData = createUserStorageLogsData;
const getUserStorageData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userStorage_model_1.UserStorage.findOne({ userId: userId === null || userId === void 0 ? void 0 : userId.toString() });
        return result === null || result === void 0 ? void 0 : result.toObject();
    }
    catch (err) {
        throw err;
    }
});
exports.getUserStorageData = getUserStorageData;
const updateUserStorageData = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userStorage_model_1.UserStorage.findOneAndUpdate({ userId: updateData === null || updateData === void 0 ? void 0 : updateData.userId }, { $set: { coveredStorage: updateData === null || updateData === void 0 ? void 0 : updateData.coveredStorage, coveredStorageUnit: updateData === null || updateData === void 0 ? void 0 : updateData.coveredStorageUnit } }, { new: true, upsert: false });
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.updateUserStorageData = updateUserStorageData;
const updateUserStorageLimitData = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userStorage_model_1.UserStorage.findOneAndUpdate({ userId: updateData === null || updateData === void 0 ? void 0 : updateData.userId }, { $set: { storage: updateData === null || updateData === void 0 ? void 0 : updateData.storage, unit: updateData === null || updateData === void 0 ? void 0 : updateData.unit } }, { new: true, upsert: false });
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.updateUserStorageLimitData = updateUserStorageLimitData;
const createUserDefaultCards = (newUserId, language) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const defaultSetData = yield (0, set_services_1.getDefaultSetData)(language);
        for (const set of defaultSetData) {
            const setData = {
                name: set.name,
                color: set.color,
                userId: newUserId,
                isHighlight: set.isHighlight,
                folderId: '',
                defaultAdded: true
            };
            const newSetId = yield (0, set_services_1.insertSetData)(setData);
            const cardData = yield (0, card_service_1.getDefaultCardData)(language, ((_a = set === null || set === void 0 ? void 0 : set._id) === null || _a === void 0 ? void 0 : _a.toString()) || '', ((_b = set === null || set === void 0 ? void 0 : set.userId) === null || _b === void 0 ? void 0 : _b.toString()) || '');
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
            if ((newCardData === null || newCardData === void 0 ? void 0 : newCardData.length) > 0) {
                yield (0, card_service_1.insertManyCardData)(newCardData);
            }
        }
        return;
    }
    catch (error) {
        throw error;
    }
});
exports.createUserDefaultCards = createUserDefaultCards;
const addAutoTranslateSetsAndCardsData = (language) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        const defaultSetData = yield (0, set_services_1.getDefaultSetData)(language);
        console.log('defaultSetData', defaultSetData === null || defaultSetData === void 0 ? void 0 : defaultSetData.length);
        // Helper function to retry translation with delay
        const retryTranslate = (text_1, to_1, ...args_1) => __awaiter(void 0, [text_1, to_1, ...args_1], void 0, function* (text, to, maxRetries = 3, delay = 1000) {
            let retries = 0;
            while (retries < maxRetries) {
                try {
                    return yield (0, google_translate_api_x_1.translate)(text, { to });
                }
                catch (translateError) {
                    retries++;
                    console.error(`Translation error (attempt ${retries}/${maxRetries}):`, translateError);
                    if (retries >= maxRetries) {
                        throw translateError; // Throw after max retries
                    }
                    // Wait before retrying
                    yield new Promise(resolve => setTimeout(resolve, delay));
                }
            }
            // This should never be reached due to the throw above, but TypeScript needs it
            return { text };
        });
        for (const set of defaultSetData) {
            let setNameResult;
            try {
                setNameResult = yield retryTranslate(set.name, language);
            }
            catch (translateError) {
                console.error('All translation attempts failed for set name:', translateError);
                setNameResult = { text: set.name }; // Use original name only after all retries fail
            }
            const setData = {
                name: (_a = setNameResult === null || setNameResult === void 0 ? void 0 : setNameResult.text) !== null && _a !== void 0 ? _a : set.name,
                color: set.color,
                userId: set.userId,
                isHighlight: set.isHighlight,
                folderId: '',
                defaultAdded: true,
            };
            const setCollectionName = (0, general_1.getSetCollectionName)(language);
            const newSetId = yield (0, set_services_1.insertSetDataIntoMultiLanguageCollection)(setData, setCollectionName);
            const cardData = yield (0, card_service_1.getCardData)(((_b = set === null || set === void 0 ? void 0 : set._id) === null || _b === void 0 ? void 0 : _b.toString()) || '', ((_c = set === null || set === void 0 ? void 0 : set.userId) === null || _c === void 0 ? void 0 : _c.toString()) || '');
            console.log('cardData', cardData === null || cardData === void 0 ? void 0 : cardData.length);
            // Translate each card field and handle promises in batches
            const translatedCardData = [];
            for (const card of cardData) {
                try {
                    // Translate top, bottom, and note with retry mechanism
                    const [topTranslation, bottomTranslation, noteTranslation] = yield Promise.all([
                        retryTranslate(card.top, language),
                        retryTranslate(card.bottom, language),
                        card.note && card.note !== '' ? retryTranslate(card.note, language) : { text: '' }
                    ]);
                    translatedCardData.push({
                        top: (_d = topTranslation === null || topTranslation === void 0 ? void 0 : topTranslation.text) !== null && _d !== void 0 ? _d : card.top,
                        bottom: (_e = bottomTranslation === null || bottomTranslation === void 0 ? void 0 : bottomTranslation.text) !== null && _e !== void 0 ? _e : card.bottom,
                        isBlur: card.isBlur,
                        position: card.position,
                        userId: card.userId,
                        setId: newSetId === null || newSetId === void 0 ? void 0 : newSetId.toString(),
                        folderId: '',
                        defaultAdded: true,
                        note: (_f = noteTranslation === null || noteTranslation === void 0 ? void 0 : noteTranslation.text) !== null && _f !== void 0 ? _f : (card.note === null ? '' : card.note)
                    });
                }
                catch (translateError) {
                    console.error('All translation attempts failed for card:', translateError);
                    // If all retries fail, add the original card without translation
                    translatedCardData.push({
                        top: card.top,
                        bottom: card.bottom,
                        isBlur: card.isBlur,
                        position: card.position,
                        userId: card.userId,
                        setId: newSetId === null || newSetId === void 0 ? void 0 : newSetId.toString(),
                        folderId: '',
                        defaultAdded: true,
                        note: card.note === null ? '' : card.note
                    });
                }
            }
            console.log('translatedCardData', translatedCardData === null || translatedCardData === void 0 ? void 0 : translatedCardData.length);
            const cardCollectionName = (0, general_1.getCardCollectionName)(language);
            if ((translatedCardData === null || translatedCardData === void 0 ? void 0 : translatedCardData.length) > 0) {
                yield (0, card_service_1.insertCardDataIntoMultiLanguageCollection)(translatedCardData, cardCollectionName);
            }
        }
        return;
    }
    catch (error) {
        throw error;
    }
});
exports.addAutoTranslateSetsAndCardsData = addAutoTranslateSetsAndCardsData;
const deleteUserAccount = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // First, fetch all S3 file URLs that need to be deleted
        const [userData, userImages, userPdfs, userSupports] = yield Promise.all([
            user_model_1.User.findById(userId),
            images_model_1.Images.find({ userId: userId }),
            pdf_model_1.Pdf.find({ userId: userId }),
            support_model_1.Support.find({ userId: userId })
        ]);
        // Collect all S3 URLs to delete
        const s3DeletionPromises = [];
        // Delete user's profile picture from S3
        if (userData === null || userData === void 0 ? void 0 : userData.picture) {
            s3DeletionPromises.push((0, uploadConfig_1.deleteFromS3)(userData.picture, general_2.FLASHCARD_IMAGES_V1_BUCKET_NAME)
                .catch(err => console.error('Error deleting profile picture:', err)));
        }
        // Delete all user's images from S3
        userImages.forEach(image => {
            if (image.url) {
                s3DeletionPromises.push((0, uploadConfig_1.deleteFromS3)(image.url, general_2.FLASHCARD_IMAGES_V1_BUCKET_NAME)
                    .catch(err => console.error('Error deleting image:', err)));
            }
        });
        // Delete all user's PDFs from S3
        userPdfs.forEach(pdf => {
            if (pdf.url) {
                s3DeletionPromises.push((0, uploadConfig_1.deleteFromS3)(pdf.url, general_2.FLASHCARD_PDF_V1_BUCKET_NAME)
                    .catch(err => console.error('Error deleting PDF:', err)));
            }
        });
        // Delete all user's support images from S3
        userSupports.forEach(support => {
            if (support.image) {
                s3DeletionPromises.push((0, uploadConfig_1.deleteFromS3)(support.image, general_2.FLASHCARD_SUPPORT_V1_BUCKET_NAME)
                    .catch(err => console.error('Error deleting support image:', err)));
            }
        });
        // Wait for all S3 deletions to complete
        yield Promise.all(s3DeletionPromises);
        // Now delete all user-related data from all database collections
        yield Promise.all([
            // Delete user's cards
            card_model_1.Card.deleteMany({ userId: userId }),
            // Delete user's sets
            set_models_1.Set.deleteMany({ userId: userId }),
            // Delete user's folders
            folder_model_1.Folder.deleteMany({ userId: userId }),
            // Delete user's image folders
            imagesFolder_model_1.ImagesFolder.deleteMany({ userId: userId }),
            // Delete user's pdf folders
            pdfFolder_model_1.PdfFolder.deleteMany({ userId: userId }),
            // Delete user's images
            images_model_1.Images.deleteMany({ userId: userId }),
            // Delete user's pdfs
            pdf_model_1.Pdf.deleteMany({ userId: userId }),
            // Delete user's notes
            notes_model_1.Notes.deleteMany({ userId: userId }),
            // Delete user's contacts (both as user and as contact)
            contacts_model_1.Contacts.deleteMany({ $or: [{ userId: userId }, { contactUserId: userId }] }),
            // Delete user's support tickets
            support_model_1.Support.deleteMany({ userId: userId }),
            // Delete user's subscription
            userSubscription_model_1.UserSubscription.deleteMany({ userId: userId }),
            // Delete user's credit data
            userCredit_model_1.UserCredit.deleteMany({ userId: userId }),
            // Delete user's credit logs
            userCreditLogs_model_1.UserCreditLogs.deleteMany({ userId: userId }),
            // Delete user's storage data
            userStorage_model_1.UserStorage.deleteMany({ userId: userId }),
            // Delete user's storage logs
            userStorageLogs_model_1.UserStorageLogs.deleteMany({ userId: userId }),
            // Finally, delete the user account
            user_model_1.User.findByIdAndDelete(userId)
        ]);
        return;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteUserAccount = deleteUserAccount;
