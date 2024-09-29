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
exports.deletePdfFolderData = exports.getPdfFolderData = exports.updatePdfFolderData = exports.createPdfFolderData = exports.deleteImagesFolderData = exports.getImagesFolderData = exports.updateImagesFolderData = exports.createImagesFolderData = exports.getFolderData = exports.deleteFolderData = exports.updateFolderData = exports.createFolderData = void 0;
const folder_model_1 = require("../models/folder.model");
const imagesFolder_model_1 = require("../models/imagesFolder.model");
const pdfFolder_model_1 = require("../models/pdfFolder.model");
const mongodb_1 = require("mongodb");
const createFolderData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = new folder_model_1.Folder(data);
        yield newData.save();
    }
    catch (err) {
        throw err;
    }
});
exports.createFolderData = createFolderData;
const updateFolderData = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const objectId = new mongodb_1.ObjectId((_a = updateData === null || updateData === void 0 ? void 0 : updateData._id) === null || _a === void 0 ? void 0 : _a.toString());
        const result = yield folder_model_1.Folder.findByIdAndUpdate(objectId, updateData, {
            new: true,
            runValidators: true
        });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.updateFolderData = updateFolderData;
const deleteFolderData = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongodb_1.ObjectId(_id === null || _id === void 0 ? void 0 : _id.toString());
        yield folder_model_1.Folder.deleteOne({ _id: objectId });
        return;
    }
    catch (err) {
        throw err;
    }
});
exports.deleteFolderData = deleteFolderData;
const getFolderData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield folder_model_1.Folder.find({ userId: userId === null || userId === void 0 ? void 0 : userId.toString() });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.getFolderData = getFolderData;
const createImagesFolderData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = new imagesFolder_model_1.ImagesFolder(data);
        yield newData.save();
    }
    catch (err) {
        throw err;
    }
});
exports.createImagesFolderData = createImagesFolderData;
const updateImagesFolderData = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const objectId = new mongodb_1.ObjectId((_a = updateData === null || updateData === void 0 ? void 0 : updateData._id) === null || _a === void 0 ? void 0 : _a.toString());
        const result = yield imagesFolder_model_1.ImagesFolder.findByIdAndUpdate(objectId, updateData, {
            new: true,
            runValidators: true
        });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.updateImagesFolderData = updateImagesFolderData;
const getImagesFolderData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield imagesFolder_model_1.ImagesFolder.find({ userId: userId === null || userId === void 0 ? void 0 : userId.toString() });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.getImagesFolderData = getImagesFolderData;
const deleteImagesFolderData = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongodb_1.ObjectId(_id === null || _id === void 0 ? void 0 : _id.toString());
        yield imagesFolder_model_1.ImagesFolder.deleteOne({ _id: objectId });
        return;
    }
    catch (err) {
        throw err;
    }
});
exports.deleteImagesFolderData = deleteImagesFolderData;
const createPdfFolderData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = new pdfFolder_model_1.PdfFolder(data);
        yield newData.save();
    }
    catch (err) {
        throw err;
    }
});
exports.createPdfFolderData = createPdfFolderData;
const updatePdfFolderData = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const objectId = new mongodb_1.ObjectId((_a = updateData === null || updateData === void 0 ? void 0 : updateData._id) === null || _a === void 0 ? void 0 : _a.toString());
        const result = yield pdfFolder_model_1.PdfFolder.findByIdAndUpdate(objectId, updateData, {
            new: true,
            runValidators: true
        });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.updatePdfFolderData = updatePdfFolderData;
const getPdfFolderData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pdfFolder_model_1.PdfFolder.find({ userId: userId === null || userId === void 0 ? void 0 : userId.toString() });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.getPdfFolderData = getPdfFolderData;
const deletePdfFolderData = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongodb_1.ObjectId(_id === null || _id === void 0 ? void 0 : _id.toString());
        yield pdfFolder_model_1.PdfFolder.deleteOne({ _id: objectId });
        return;
    }
    catch (err) {
        throw err;
    }
});
exports.deletePdfFolderData = deletePdfFolderData;
