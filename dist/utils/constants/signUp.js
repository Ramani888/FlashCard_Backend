"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpApiSource = void 0;
exports.SignUpApiSource = {
    post: {
        signUp: { path: '/signUp', message: 'Otp Send Successfully.' },
        verifyOtp: { path: '/signUp/verifyOtp', meessage: 'Otp Verified Successfully.', userSuccessMsg: 'User Created Successfully.' },
    }
};
