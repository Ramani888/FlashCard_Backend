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
exports.getNotes = exports.deleteNotes = exports.updateNotes = exports.createNotes = void 0;
const http_status_codes_1 = require("http-status-codes");
const notes_1 = require("../utils/constants/notes");
const notes_service_1 = require("../services/notes.service");
const createNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        yield (0, notes_service_1.createNotesData)(bodyData);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: notes_1.NotesApiSource.post.createNotes.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.createNotes = createNotes;
const updateNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        yield (0, notes_service_1.updateNotesData)(bodyData);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: notes_1.NotesApiSource.put.updateNotes.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.updateNotes = updateNotes;
const deleteNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.query;
    try {
        yield (0, notes_service_1.deleteNotesData)(_id);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: notes_1.NotesApiSource.delete.deleteNotes.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.deleteNotes = deleteNotes;
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const data = yield (0, notes_service_1.getNotesData)(userId);
        res.status(http_status_codes_1.StatusCodes.OK).send(data);
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.getNotes = getNotes;
