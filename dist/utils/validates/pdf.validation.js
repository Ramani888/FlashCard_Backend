"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignPdfFolderValidation = exports.deletePdfValidation = exports.getPdfByFolderIdValidation = exports.getPdfValidation = exports.updatePdfValidation = exports.uploadPdfValidation = void 0;
exports.uploadPdfValidation = {
    userId: 'required|string',
    color: 'required|string',
    name: 'required|string',
    isHighlight: 'required|boolean',
};
exports.updatePdfValidation = {
    _id: 'required|string',
};
exports.getPdfValidation = {
    userId: 'required|string'
};
exports.getPdfByFolderIdValidation = {
    userId: 'required|string',
    folderId: 'required|string'
};
exports.deletePdfValidation = {
    _id: 'required|string',
};
exports.assignPdfFolderValidation = {
    _id: 'required|string',
    folderId: 'required|string'
};
