"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignImageFolderValidation = exports.deleteImageValidation = exports.getImageByFolderIdValidation = exports.getImageValidation = exports.updateImageValidation = exports.uploadImageValidation = void 0;
exports.uploadImageValidation = {
    userId: 'required|string'
};
exports.updateImageValidation = {
    _id: 'required|string',
};
exports.getImageValidation = {
    userId: 'required|string'
};
exports.getImageByFolderIdValidation = {
    userId: 'required|string',
    folderId: 'required|string'
};
exports.deleteImageValidation = {
    _id: 'required|string',
};
exports.assignImageFolderValidation = {
    _id: 'required|string',
    folderId: 'required|string'
};
