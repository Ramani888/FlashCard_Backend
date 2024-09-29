"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfFolderApiSource = exports.ImagesFolderApiSource = exports.FolderApiSource = void 0;
exports.FolderApiSource = {
    post: {
        createFolder: { path: '/folder', message: 'Folder Created Successfully.' }
    },
    put: {
        updateFolder: { path: '/folder', message: 'Folder Updated Successfully.' },
        assignFolder: { path: '/assign/folder', message: 'Assign Folder Successfully.' }
    },
    delete: {
        deleteFolder: { path: '/folder', message: 'Folder Deleted Successfully.' }
    },
    get: {
        getFolder: { path: '/folder', message: 'Folder get Successfully.' }
    }
};
exports.ImagesFolderApiSource = {
    post: {
        createFolder: { path: '/images/folder', message: 'Folder Created Successfully.' }
    },
    put: {
        updateFolder: { path: '/images/folder', message: 'Folder Update Successfully.' }
    },
    get: {
        getFolder: { path: '/images/folder', message: 'Folder get Successfully.' }
    },
    delete: {
        deleteFolder: { path: '/images/folder', message: 'Folder Deleted Successfully.' }
    },
};
exports.PdfFolderApiSource = {
    post: {
        createFolder: { path: '/pdf/folder', message: 'Folder Created Successfully.' }
    },
    put: {
        updateFolder: { path: '/pdf/folder', message: 'Folder Update Successfully.' }
    },
    get: {
        getFolder: { path: '/pdf/folder', message: 'Folder get Successfully.' }
    },
    delete: {
        deleteFolder: { path: '/pdf/folder', message: 'Folder Deleted Successfully.' }
    },
};
