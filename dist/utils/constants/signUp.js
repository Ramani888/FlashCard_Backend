"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PICTURE = exports.SignUpApiSource = void 0;
exports.SignUpApiSource = {
    post: {
        signUp: { path: '/signUp', message: 'Otp Send Successfully.' },
        verifyOtp: { path: '/signUp/verifyOtp', meessage: 'Otp Verified Successfully.', userSuccessMsg: 'User Created Successfully.' }
    },
    put: {
        resendOtp: { path: '/signUp/resendOtp', message: 'Otp Send Successfully.' }
    }
};
exports.DEFAULT_PICTURE = `https://flashcard-images-v1.s3.us-east-1.amazonaws.com/Profile.png`;
