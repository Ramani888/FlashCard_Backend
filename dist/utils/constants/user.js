"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultUserId = exports.UserApiSource = void 0;
exports.UserApiSource = {
    put: {
        updateCredit: { path: '/credit', message: 'AI Credit Updated Successfully.' }
    },
    post: {
        addDefaultSetsAndCards: { path: '/addDefaultSetsAndCards', message: 'Default Sets and Cards Added Successfully.' },
        addAutoTranslateSetsAndCards: { path: '/addAutoTranslateSetsAndCards', message: 'Auto Translate Sets and Cards Added Successfully.' }
    }
};
exports.defaultUserId = '66e737daf9aa4eac9897d37d';
