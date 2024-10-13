"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordVerifyOtpValidation = exports.updatePasswordValidation = exports.updateProfilePictureValidation = void 0;
exports.updateProfilePictureValidation = {
    _id: 'required|string',
};
exports.updatePasswordValidation = {
    email: 'required|email',
    password: 'required|string'
};
exports.updatePasswordVerifyOtpValidation = {
    email: 'required|email',
    password: 'required|string',
    otp: 'required|numeric'
};
