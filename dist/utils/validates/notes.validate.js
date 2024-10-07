"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotesValidation = exports.deleteNotesValidation = exports.updateNotesValidation = exports.createNotesValidation = void 0;
exports.createNotesValidation = {
    name: 'required|string',
    color: 'required|string',
    userId: 'required|string',
    note: 'string',
    isHighlight: 'required|boolean'
};
exports.updateNotesValidation = {
    _id: 'required|string',
};
exports.deleteNotesValidation = {
    _id: 'required|string',
};
exports.getNotesValidation = {
    userId: 'required|string'
};
