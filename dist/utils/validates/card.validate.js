"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveCardValidation = exports.blurAllCardValidation = exports.deleteCardValidation = exports.getCardValidation = exports.updateCardValidation = exports.createCardValidation = void 0;
exports.createCardValidation = {
    top: 'required|string',
    bottom: 'required|string',
    note: 'string',
    setId: 'required|string',
    folderId: 'string',
    userId: 'required|string',
    isBlur: 'boolean'
};
exports.updateCardValidation = {
    _id: 'required|string',
};
exports.getCardValidation = {
    setId: 'required|string',
    userId: 'required|string'
};
exports.deleteCardValidation = {
    _id: 'required|string',
};
exports.blurAllCardValidation = {
    setId: 'required|string',
    isBlur: 'required|boolean'
};
exports.moveCardValidation = {
    setId: 'required|string',
    cardId: 'required|string'
};
