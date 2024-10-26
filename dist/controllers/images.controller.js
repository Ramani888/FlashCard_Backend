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
exports.assignImageFolder = exports.deleteImages = exports.getImagesByFolderId = exports.getImages = exports.updateImages = exports.uploadImages = void 0;
const http_status_codes_1 = require("http-status-codes");
const uploadConfig_1 = require("../routes/uploadConfig");
const images_1 = require("../utils/constants/images");
const images_service_1 = require("../services/images.service");
const general_1 = require("../utils/constants/general");
const general_2 = require("../utils/helpers/general");
const user_service_1 = require("../services/user.service");
const uploadImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const bodyData = req.body;
    const { userId } = req === null || req === void 0 ? void 0 : req.body;
    try {
        if (!req.file) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({ error: 'Image file is missing.' });
            return;
        }
        //Upload New Image And Add New Data
        const imageUrl = yield (0, uploadConfig_1.uploadToS3)(req.file, general_1.FLASHCARD_IMAGES_V1_BUCKET_NAME);
        const newImageId = yield (0, images_service_1.uploadImagesData)(Object.assign(Object.assign({}, bodyData), { url: imageUrl }));
        //For Storage Update Process
        const fileSize = (0, general_2.calculateFileSizeInMB)((_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.size);
        const userStorageData = yield (0, user_service_1.getUserStorageData)(userId);
        if (userStorageData) {
            const result = (0, general_2.calculateStorage)(userStorageData === null || userStorageData === void 0 ? void 0 : userStorageData.storage, userStorageData === null || userStorageData === void 0 ? void 0 : userStorageData.unit, userStorageData === null || userStorageData === void 0 ? void 0 : userStorageData.coveredStorage, userStorageData === null || userStorageData === void 0 ? void 0 : userStorageData.coveredStorageUnit, fileSize === null || fileSize === void 0 ? void 0 : fileSize.size, fileSize === null || fileSize === void 0 ? void 0 : fileSize.unit, 'added');
            if (!result)
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "Adding this data exceeds the maximum storage limit. Cannot add new storage data." });
            if (result) {
                const updateStorageData = {
                    userId: userId,
                    storage: userStorageData === null || userStorageData === void 0 ? void 0 : userStorageData.storage,
                    unit: userStorageData === null || userStorageData === void 0 ? void 0 : userStorageData.unit,
                    coveredStorage: Number(result === null || result === void 0 ? void 0 : result.updatedCoveredStorageSize),
                    coveredStorageUnit: String(result === null || result === void 0 ? void 0 : result.updatedCoveredStorageUnit)
                };
                yield (0, user_service_1.updateUserStorageData)(updateStorageData);
                const storageLogsData = {
                    userId: userId,
                    documentId: newImageId,
                    storage: fileSize === null || fileSize === void 0 ? void 0 : fileSize.size,
                    unit: fileSize === null || fileSize === void 0 ? void 0 : fileSize.unit,
                    type: 'added'
                };
                yield (0, user_service_1.createUserStorageLogsData)(storageLogsData);
            }
        }
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: images_1.ImagesApiSource.post.uploadImage.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.uploadImages = uploadImages;
const updateImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        const file = req.file;
        if (file) {
            const imagesData = yield (0, images_service_1.getImagesById)(bodyData === null || bodyData === void 0 ? void 0 : bodyData._id);
            const metadata = yield (0, uploadConfig_1.getImageMetadataFromUrl)(String(imagesData === null || imagesData === void 0 ? void 0 : imagesData.url));
            if (imagesData) {
                yield (0, uploadConfig_1.deleteFromS3)(imagesData === null || imagesData === void 0 ? void 0 : imagesData.url, general_1.FLASHCARD_IMAGES_V1_BUCKET_NAME);
            }
            const imageUrl = yield (0, uploadConfig_1.uploadToS3)(req.file, general_1.FLASHCARD_IMAGES_V1_BUCKET_NAME);
            yield (0, images_service_1.updateImagesData)(Object.assign(Object.assign({}, bodyData), { url: imageUrl }));
            //Update Storage Using Old Data
            const fileSize = (0, general_2.calculateFileSizeInMB)(Number(metadata === null || metadata === void 0 ? void 0 : metadata.imageSize));
            const userStorageData = yield (0, user_service_1.getUserStorageData)(String(imagesData === null || imagesData === void 0 ? void 0 : imagesData.userId));
            if (userStorageData) {
                const result = (0, general_2.calculateStorage)(userStorageData === null || userStorageData === void 0 ? void 0 : userStorageData.storage, userStorageData === null || userStorageData === void 0 ? void 0 : userStorageData.unit, userStorageData === null || userStorageData === void 0 ? void 0 : userStorageData.coveredStorage, userStorageData === null || userStorageData === void 0 ? void 0 : userStorageData.coveredStorageUnit, fileSize === null || fileSize === void 0 ? void 0 : fileSize.size, fileSize === null || fileSize === void 0 ? void 0 : fileSize.unit, 'deleted');
                if (!result)
                    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "Adding this data exceeds the maximum storage limit. Cannot add new storage data." });
                if (result) {
                    const updateStorageData = {
                        userId: String(imagesData === null || imagesData === void 0 ? void 0 : imagesData.userId),
                        storage: userStorageData === null || userStorageData === void 0 ? void 0 : userStorageData.storage,
                        unit: userStorageData === null || userStorageData === void 0 ? void 0 : userStorageData.unit,
                        coveredStorage: Number(result === null || result === void 0 ? void 0 : result.updatedCoveredStorageSize),
                        coveredStorageUnit: String(result === null || result === void 0 ? void 0 : result.updatedCoveredStorageUnit)
                    };
                    yield (0, user_service_1.updateUserStorageData)(updateStorageData);
                }
            }
            //Update Storage Using New Data
            const fileSizeNew = (0, general_2.calculateFileSizeInMB)(Number(file === null || file === void 0 ? void 0 : file.size));
            const userStorageDataNew = yield (0, user_service_1.getUserStorageData)(String(imagesData === null || imagesData === void 0 ? void 0 : imagesData.userId));
            if (userStorageDataNew) {
                const result = (0, general_2.calculateStorage)(userStorageDataNew === null || userStorageDataNew === void 0 ? void 0 : userStorageDataNew.storage, userStorageDataNew === null || userStorageDataNew === void 0 ? void 0 : userStorageDataNew.unit, userStorageDataNew === null || userStorageDataNew === void 0 ? void 0 : userStorageDataNew.coveredStorage, userStorageDataNew === null || userStorageDataNew === void 0 ? void 0 : userStorageDataNew.coveredStorageUnit, fileSizeNew === null || fileSizeNew === void 0 ? void 0 : fileSizeNew.size, fileSizeNew === null || fileSizeNew === void 0 ? void 0 : fileSizeNew.unit, 'added');
                if (!result)
                    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "Adding this data exceeds the maximum storage limit. Cannot add new storage data." });
                if (result) {
                    const updateStorageData = {
                        userId: String(imagesData === null || imagesData === void 0 ? void 0 : imagesData.userId),
                        storage: userStorageDataNew === null || userStorageDataNew === void 0 ? void 0 : userStorageDataNew.storage,
                        unit: userStorageDataNew === null || userStorageDataNew === void 0 ? void 0 : userStorageDataNew.unit,
                        coveredStorage: Number(result === null || result === void 0 ? void 0 : result.updatedCoveredStorageSize),
                        coveredStorageUnit: String(result === null || result === void 0 ? void 0 : result.updatedCoveredStorageUnit)
                    };
                    yield (0, user_service_1.updateUserStorageData)(updateStorageData);
                    const storageLogsData = {
                        userId: String(imagesData === null || imagesData === void 0 ? void 0 : imagesData.userId),
                        documentId: bodyData === null || bodyData === void 0 ? void 0 : bodyData._id,
                        storage: fileSizeNew === null || fileSizeNew === void 0 ? void 0 : fileSizeNew.size,
                        unit: fileSizeNew === null || fileSizeNew === void 0 ? void 0 : fileSizeNew.unit,
                        type: 'updated'
                    };
                    yield (0, user_service_1.createUserStorageLogsData)(storageLogsData);
                }
            }
        }
        else {
            yield (0, images_service_1.updateImagesData)(bodyData);
        }
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: images_1.ImagesApiSource.put.updateImage.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.updateImages = updateImages;
const getImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const data = yield (0, images_service_1.getImagesData)(userId);
        res.status(http_status_codes_1.StatusCodes.OK).send(data);
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.getImages = getImages;
const getImagesByFolderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, folderId } = req.query;
    try {
        const data = yield (0, images_service_1.getImagesDataByFolderId)(userId, folderId);
        res.status(http_status_codes_1.StatusCodes.OK).send(data);
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.getImagesByFolderId = getImagesByFolderId;
const deleteImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.query;
    try {
        const imagesData = yield (0, images_service_1.getImagesById)(_id);
        const metadata = yield (0, uploadConfig_1.getImageMetadataFromUrl)(String(imagesData === null || imagesData === void 0 ? void 0 : imagesData.url));
        if (imagesData) {
            yield (0, uploadConfig_1.deleteFromS3)(imagesData === null || imagesData === void 0 ? void 0 : imagesData.url, general_1.FLASHCARD_IMAGES_V1_BUCKET_NAME);
        }
        yield (0, images_service_1.deleteImagesData)(_id);
        //Update Storage
        const fileSize = (0, general_2.calculateFileSizeInMB)(Number(metadata === null || metadata === void 0 ? void 0 : metadata.imageSize));
        const userStorageData = yield (0, user_service_1.getUserStorageData)(String(imagesData === null || imagesData === void 0 ? void 0 : imagesData.userId));
        if (userStorageData) {
            const result = (0, general_2.calculateStorage)(userStorageData === null || userStorageData === void 0 ? void 0 : userStorageData.storage, userStorageData === null || userStorageData === void 0 ? void 0 : userStorageData.unit, userStorageData === null || userStorageData === void 0 ? void 0 : userStorageData.coveredStorage, userStorageData === null || userStorageData === void 0 ? void 0 : userStorageData.coveredStorageUnit, fileSize === null || fileSize === void 0 ? void 0 : fileSize.size, fileSize === null || fileSize === void 0 ? void 0 : fileSize.unit, 'deleted');
            if (!result)
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "Adding this data exceeds the maximum storage limit. Cannot add new storage data." });
            if (result) {
                const updateStorageData = {
                    userId: String(imagesData === null || imagesData === void 0 ? void 0 : imagesData.userId),
                    storage: userStorageData === null || userStorageData === void 0 ? void 0 : userStorageData.storage,
                    unit: userStorageData === null || userStorageData === void 0 ? void 0 : userStorageData.unit,
                    coveredStorage: Number(result === null || result === void 0 ? void 0 : result.updatedCoveredStorageSize),
                    coveredStorageUnit: String(result === null || result === void 0 ? void 0 : result.updatedCoveredStorageUnit)
                };
                yield (0, user_service_1.updateUserStorageData)(updateStorageData);
                const storageLogsData = {
                    userId: String(imagesData === null || imagesData === void 0 ? void 0 : imagesData.userId),
                    documentId: _id,
                    storage: fileSize === null || fileSize === void 0 ? void 0 : fileSize.size,
                    unit: fileSize === null || fileSize === void 0 ? void 0 : fileSize.unit,
                    type: 'deleted'
                };
                yield (0, user_service_1.createUserStorageLogsData)(storageLogsData);
            }
        }
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: images_1.ImagesApiSource.delete.deleteImage.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.deleteImages = deleteImages;
const assignImageFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, folderId } = req.query;
    try {
        const imagesData = yield (0, images_service_1.getImagesById)(_id);
        if (!imagesData)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'Image data not found.' });
        yield (0, images_service_1.updateImagesData)(Object.assign(Object.assign({}, imagesData), { folderId: folderId }));
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: images_1.ImagesApiSource.put.assignImageFolder.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.assignImageFolder = assignImageFolder;
