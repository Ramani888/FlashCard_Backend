"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePdfFolderValidation = exports.getPdfFolderValidation = exports.updatePdfFolderValidation = exports.createPdfFolderValidation = exports.deleteImagesFolderValidation = exports.getImagesFolderValidation = exports.updateImagesFolderValidation = exports.createImagesFolderValidation = exports.assignFolderValidation = exports.getFolderValidation = exports.deleteFolderValidation = exports.updateFolderValidation = exports.createfolderValidation = void 0;
exports.createfolderValidation = {
    name: 'required|string',
    color: 'required|string',
    userId: 'required|string',
    isHighlight: 'required|boolean'
};
exports.updateFolderValidation = {
    _id: 'required|string',
};
exports.deleteFolderValidation = {
    _id: 'required|string',
};
exports.getFolderValidation = {
    userId: 'required|string',
    search: 'string'
};
exports.assignFolderValidation = {
    folderId: 'required|string',
    setId: 'required|string'
};
exports.createImagesFolderValidation = {
    name: 'required|string',
    color: 'required|string',
    userId: 'required|string',
    isHighlight: 'required|boolean'
};
exports.updateImagesFolderValidation = {
    _id: 'required|string',
};
exports.getImagesFolderValidation = {
    userId: 'required|string'
};
exports.deleteImagesFolderValidation = {
    _id: 'required|string',
};
exports.createPdfFolderValidation = {
    name: 'required|string',
    color: 'required|string',
    userId: 'required|string',
    isHighlight: 'required|boolean'
};
exports.updatePdfFolderValidation = {
    _id: 'required|string',
};
exports.getPdfFolderValidation = {
    userId: 'required|string'
};
exports.deletePdfFolderValidation = {
    _id: 'required|string',
};
