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
exports.deleteImagesData = exports.getImagesDataByFolderId = exports.getImagesData = exports.updateImagesData = exports.getImagesById = exports.uploadImagesData = void 0;
const images_model_1 = require("../models/images.model");
const mongodb_1 = require("mongodb");
const uploadImagesData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = new images_model_1.Images(data);
        yield newData.save();
    }
    catch (err) {
        throw err;
    }
});
exports.uploadImagesData = uploadImagesData;
const getImagesById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongodb_1.ObjectId(_id === null || _id === void 0 ? void 0 : _id.toString());
        const result = yield images_model_1.Images.findOne({ _id: objectId });
        return result === null || result === void 0 ? void 0 : result.toObject();
    }
    catch (err) {
        throw err;
    }
});
exports.getImagesById = getImagesById;
const updateImagesData = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const objectId = new mongodb_1.ObjectId((_a = updateData === null || updateData === void 0 ? void 0 : updateData._id) === null || _a === void 0 ? void 0 : _a.toString());
        const result = yield images_model_1.Images.findByIdAndUpdate(objectId, updateData, {
            new: true,
            runValidators: true
        });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.updateImagesData = updateImagesData;
const getImagesData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield images_model_1.Images.find({ userId: userId === null || userId === void 0 ? void 0 : userId.toString() });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.getImagesData = getImagesData;
const getImagesDataByFolderId = (userId, folderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield images_model_1.Images.find({ userId: userId === null || userId === void 0 ? void 0 : userId.toString(), folderId: folderId === null || folderId === void 0 ? void 0 : folderId.toString() });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.getImagesDataByFolderId = getImagesDataByFolderId;
const deleteImagesData = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongodb_1.ObjectId(_id === null || _id === void 0 ? void 0 : _id.toString());
        yield images_model_1.Images.deleteOne({ _id: objectId });
        return;
    }
    catch (err) {
        throw err;
    }
});
exports.deleteImagesData = deleteImagesData;
