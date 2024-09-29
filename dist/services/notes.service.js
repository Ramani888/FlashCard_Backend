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
exports.getNotesData = exports.deleteNotesData = exports.updateNotesData = exports.createNotesData = void 0;
const notes_model_1 = require("../models/notes.model");
const mongodb_1 = require("mongodb");
const createNotesData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = new notes_model_1.Notes(data);
        yield newData.save();
    }
    catch (err) {
        throw err;
    }
});
exports.createNotesData = createNotesData;
const updateNotesData = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const objectId = new mongodb_1.ObjectId((_a = updateData === null || updateData === void 0 ? void 0 : updateData._id) === null || _a === void 0 ? void 0 : _a.toString());
        const result = yield notes_model_1.Notes.findByIdAndUpdate(objectId, updateData, {
            new: true,
            runValidators: true
        });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.updateNotesData = updateNotesData;
const deleteNotesData = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongodb_1.ObjectId(_id === null || _id === void 0 ? void 0 : _id.toString());
        yield notes_model_1.Notes.deleteOne({ _id: objectId });
        return;
    }
    catch (err) {
        throw err;
    }
});
exports.deleteNotesData = deleteNotesData;
const getNotesData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield notes_model_1.Notes.find({ userId: userId === null || userId === void 0 ? void 0 : userId.toString() });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.getNotesData = getNotesData;
