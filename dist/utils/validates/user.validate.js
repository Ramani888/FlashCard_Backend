"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAutoTranslateSetsAndCardsValidation = exports.addDefaultSetsAndCardsValidation = exports.updateUserCreditValidation = void 0;
exports.updateUserCreditValidation = {
    userId: 'required|string',
    credit: 'required|numeric',
    type: 'required|string'
};
exports.addDefaultSetsAndCardsValidation = {
    userId: 'required|string',
    language: 'required|string'
};
exports.addAutoTranslateSetsAndCardsValidation = {
    language: 'required|string'
};
