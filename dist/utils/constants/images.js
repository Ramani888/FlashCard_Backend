"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesApiSource = void 0;
exports.ImagesApiSource = {
    post: {
        uploadImage: { path: '/images', message: 'Image Upload Successfully.' }
    },
    put: {
        updateImage: { path: '/images', message: 'Image Update Successfully.' },
        assignImageFolder: { path: '/assign/image/folder', message: 'Image Assign Folder Successfully.' }
    },
    get: {
        getImages: { path: '/images', message: 'Images Get Successfully.' },
        getImagesByFolderId: { path: '/folder/images', message: 'Images Get Successfully.' }
    },
    delete: {
        deleteImage: { path: '/images', message: 'Image Deleted Successfully.' }
    },
};
