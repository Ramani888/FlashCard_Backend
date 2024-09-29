"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetApiSource = void 0;
exports.SetApiSource = {
    post: {
        createSet: { path: '/set', message: 'Set Created Successfully.' }
    },
    put: {
        updateSet: { path: '/set', message: 'Set Updated Successfully.' }
    },
    delete: {
        deleteSet: { path: '/set', message: 'Set Deleted Successfully.' }
    },
    get: {
        getSet: { path: '/set', message: 'Set get Successfully.' },
        getSetByFolderId: { path: '/folder/set', message: 'Set get Successfully.' }
    }
};
