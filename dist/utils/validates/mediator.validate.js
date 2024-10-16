"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMediatorCardValidation = exports.updateMediatorSetValidation = exports.getMediatorSetValidation = void 0;
exports.getMediatorSetValidation = {
    userId: 'required|string'
};
exports.updateMediatorSetValidation = {
    userId: 'required|string',
    setId: 'required|string',
    folderId: 'required|string'
};
exports.updateMediatorCardValidation = {
    userId: 'required|string',
    setId: 'required|string',
    cardId: 'required|string'
};
