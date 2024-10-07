"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSetByFolderValidation = exports.getSetValidation = exports.deleteSetValidation = exports.updateSetValidation = exports.createSetValidation = void 0;
exports.createSetValidation = {
    name: 'required|string',
    isPrivate: 'required|boolean',
    color: 'required|string',
    userId: 'required|string',
    folderId: 'string',
    isHighlight: 'required|boolean',
};
exports.updateSetValidation = {
    _id: 'required|string',
};
exports.deleteSetValidation = {
    _id: 'required|string',
};
exports.getSetValidation = {
    userId: 'required|string'
};
exports.getSetByFolderValidation = {
    folderId: 'required|string',
    userId: 'required|string'
};
