export const uploadImageValidation = {
    userId: 'required|string'
};

export const updateImageValidation = {
    _id: 'required|string',
};

export const getImageValidation = {
    userId: 'required|string'
};

export const getImageByFolderIdValidation = {
    userId: 'required|string',
    folderId: 'required|string'
};

export const deleteImageValidation = {
    _id: 'required|string',
};

export const assignImageFolderValidation = {
    _id: 'required|string',
    folderId: 'required|string'
};
