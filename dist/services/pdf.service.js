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
exports.deletePdfData = exports.getPdfDataByFolderId = exports.getPdfData = exports.updatePdfData = exports.getPdfById = exports.uploadPdfData = void 0;
const pdf_model_1 = require("../models/pdf.model");
const mongodb_1 = require("mongodb");
const uploadPdfData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const newData = new pdf_model_1.Pdf(data);
        const savedData = yield newData.save();
        return (_a = savedData._id) === null || _a === void 0 ? void 0 : _a.toString();
    }
    catch (err) {
        throw err;
    }
});
exports.uploadPdfData = uploadPdfData;
const getPdfById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongodb_1.ObjectId(_id === null || _id === void 0 ? void 0 : _id.toString());
        const result = yield pdf_model_1.Pdf.findOne({ _id: objectId });
        return result === null || result === void 0 ? void 0 : result.toObject();
    }
    catch (err) {
        throw err;
    }
});
exports.getPdfById = getPdfById;
const updatePdfData = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const objectId = new mongodb_1.ObjectId((_a = updateData === null || updateData === void 0 ? void 0 : updateData._id) === null || _a === void 0 ? void 0 : _a.toString());
        const result = yield pdf_model_1.Pdf.findByIdAndUpdate(objectId, updateData, {
            new: true,
            runValidators: true
        });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.updatePdfData = updatePdfData;
const getPdfData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const result = await Pdf.find({ userId: userId?.toString() });
        const result = yield pdf_model_1.Pdf.aggregate([
            {
                $match: {
                    userId: userId === null || userId === void 0 ? void 0 : userId.toString()
                }
            },
            {
                $addFields: {
                    folderIdObject: { $toObjectId: "$folderId" },
                }
            },
            {
                $lookup: {
                    from: "PdfFolder",
                    localField: "folderIdObject",
                    foreignField: "_id",
                    as: "folderData"
                }
            },
            {
                $unwind: {
                    path: "$folderData", // Unwind to make folderData a single object
                    preserveNullAndEmptyArrays: true // Keep the original document if no match is found
                }
            },
            {
                $project: {
                    "_id": 1,
                    "url": 1,
                    "folderId": 1,
                    "userId": 1,
                    "color": 1,
                    "name": 1,
                    "isHighlight": 1,
                    "createdAt": 1,
                    "updatedAt": 1,
                    "folderName": "$folderData.name",
                }
            }
        ]);
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.getPdfData = getPdfData;
const getPdfDataByFolderId = (userId, folderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const result = await Pdf.find({ userId: userId?.toString(), folderId: folderId?.toString() });
        const result = yield pdf_model_1.Pdf.aggregate([
            {
                $match: {
                    userId: userId === null || userId === void 0 ? void 0 : userId.toString(),
                    folderId: folderId === null || folderId === void 0 ? void 0 : folderId.toString()
                }
            },
            {
                $addFields: {
                    folderIdObject: { $toObjectId: "$folderId" },
                }
            },
            {
                $lookup: {
                    from: "PdfFolder",
                    localField: "folderIdObject",
                    foreignField: "_id",
                    as: "folderData"
                }
            },
            {
                $unwind: {
                    path: "$folderData", // Unwind to make folderData a single object
                    preserveNullAndEmptyArrays: true // Keep the original document if no match is found
                }
            },
            {
                $project: {
                    "_id": 1,
                    "url": 1,
                    "folderId": 1,
                    "userId": 1,
                    "color": 1,
                    "name": 1,
                    "isHighlight": 1,
                    "createdAt": 1,
                    "updatedAt": 1,
                    "folderName": "$folderData.name",
                }
            }
        ]);
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.getPdfDataByFolderId = getPdfDataByFolderId;
const deletePdfData = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongodb_1.ObjectId(_id === null || _id === void 0 ? void 0 : _id.toString());
        yield pdf_model_1.Pdf.deleteOne({ _id: objectId });
        return;
    }
    catch (err) {
        throw err;
    }
});
exports.deletePdfData = deletePdfData;
