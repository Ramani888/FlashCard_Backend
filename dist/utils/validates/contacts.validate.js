"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContactsValidation = exports.getContactsValidation = exports.addContactsValidation = exports.getUsersValidation = void 0;
exports.getUsersValidation = {
    search: 'required|string',
    userId: 'required|string'
};
exports.addContactsValidation = {
    userId: 'required|string',
    contactUserId: 'required|string'
};
exports.getContactsValidation = {
    userId: 'required|string'
};
exports.deleteContactsValidation = {
    _id: 'required|string',
};
