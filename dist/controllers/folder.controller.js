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
exports.deletePdfFolder = exports.getPdfFolder = exports.updatePdfFolder = exports.createPdfFolder = exports.deleteImagesFolder = exports.getImagesFolder = exports.updateImagesFolder = exports.createImagesFolder = exports.assignFolder = exports.getFolder = exports.deleteFolder = exports.updateFolder = exports.createFolder = void 0;
const http_status_codes_1 = require("http-status-codes");
const folder_service_1 = require("../services/folder.service");
const folder_1 = require("../utils/constants/folder");
const card_service_1 = require("../services/card.service");
const set_services_1 = require("../services/set.services");
const createFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        yield (0, folder_service_1.createFolderData)(bodyData);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: folder_1.FolderApiSource.post.createFolder.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.createFolder = createFolder;
const updateFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        yield (0, folder_service_1.updateFolderData)(bodyData);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: folder_1.FolderApiSource.put.updateFolder.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.updateFolder = updateFolder;
const deleteFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.query;
    try {
        yield (0, folder_service_1.deleteFolderData)(_id);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: folder_1.FolderApiSource.delete.deleteFolder.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.deleteFolder = deleteFolder;
const getFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, search } = req.query;
    try {
        const data = yield (0, folder_service_1.getFolderData)(userId, search);
        res.status(http_status_codes_1.StatusCodes.OK).send(data);
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.getFolder = getFolder;
const assignFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { folderId, setId } = req.query;
    try {
        /********** first cart in update folderId **********/
        const cardData = yield (0, card_service_1.getCardBySetId)(setId);
        cardData === null || cardData === void 0 ? void 0 : cardData.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            if (cardData) {
                const updatedCardData = Object.assign(Object.assign({}, item), { note: (item === null || item === void 0 ? void 0 : item.note) || '', folderId: folderId });
                yield (0, card_service_1.updateCardData)(updatedCardData);
            }
        }));
        /********** second set in update folderId **********/
        const setData = yield (0, set_services_1.getSetBySetId)(setId);
        if (setData) {
            const updatedSetData = Object.assign(Object.assign({}, setData), { folderId: folderId });
            yield (0, set_services_1.updateSetData)(updatedSetData);
        }
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: folder_1.FolderApiSource.put.assignFolder.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.assignFolder = assignFolder;
const createImagesFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        yield (0, folder_service_1.createImagesFolderData)(bodyData);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: folder_1.ImagesFolderApiSource.post.createFolder.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.createImagesFolder = createImagesFolder;
const updateImagesFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        yield (0, folder_service_1.updateImagesFolderData)(bodyData);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: folder_1.ImagesFolderApiSource.put.updateFolder.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.updateImagesFolder = updateImagesFolder;
const getImagesFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const data = yield (0, folder_service_1.getImagesFolderData)(userId);
        res.status(http_status_codes_1.StatusCodes.OK).send(data);
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.getImagesFolder = getImagesFolder;
const deleteImagesFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.query;
    try {
        yield (0, folder_service_1.deleteImagesFolderData)(_id);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: folder_1.ImagesFolderApiSource.delete.deleteFolder.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.deleteImagesFolder = deleteImagesFolder;
const createPdfFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        yield (0, folder_service_1.createPdfFolderData)(bodyData);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: folder_1.PdfFolderApiSource.post.createFolder.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.createPdfFolder = createPdfFolder;
const updatePdfFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        yield (0, folder_service_1.updatePdfFolderData)(bodyData);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: folder_1.PdfFolderApiSource.put.updateFolder.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.updatePdfFolder = updatePdfFolder;
const getPdfFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const data = yield (0, folder_service_1.getPdfFolderData)(userId);
        res.status(http_status_codes_1.StatusCodes.OK).send(data);
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.getPdfFolder = getPdfFolder;
const deletePdfFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.query;
    try {
        yield (0, folder_service_1.deletePdfFolderData)(_id);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: folder_1.PdfFolderApiSource.delete.deleteFolder.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.deletePdfFolder = deletePdfFolder;
