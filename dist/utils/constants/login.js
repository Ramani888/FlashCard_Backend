"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginApiSource = void 0;
exports.LoginApiSource = {
    post: {
        login: {
            path: '/login',
            messages: {
                success: 'Logged in successfully.',
                invalidEmail: 'Email does not exist.',
                invalidPassword: 'Password does not match.'
            }
        }
    }
};
