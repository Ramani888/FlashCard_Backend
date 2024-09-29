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
const uploadImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        if (!req.file) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({ error: 'Image file is missing.' });
            return;
        }
        const imageUrl = yield (0, uploadConfig_1.uploadToS3)(req.file, general_1.FLASHCARD_IMAGES_V1_BUCKET_NAME);
        yield (0, images_service_1.uploadImagesData)(Object.assign(Object.assign({}, bodyData), { url: imageUrl }));
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
            if (imagesData) {
                yield (0, uploadConfig_1.deleteFromS3)(imagesData === null || imagesData === void 0 ? void 0 : imagesData.url, general_1.FLASHCARD_IMAGES_V1_BUCKET_NAME);
            }
            const imageUrl = yield (0, uploadConfig_1.uploadToS3)(req.file, general_1.FLASHCARD_IMAGES_V1_BUCKET_NAME);
            yield (0, images_service_1.updateImagesData)(Object.assign(Object.assign({}, bodyData), { url: imageUrl }));
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
        if (imagesData) {
            yield (0, uploadConfig_1.deleteFromS3)(imagesData === null || imagesData === void 0 ? void 0 : imagesData.url, general_1.FLASHCARD_IMAGES_V1_BUCKET_NAME);
        }
        yield (0, images_service_1.deleteImagesData)(_id);
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
