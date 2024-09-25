export const createSetValidation = {
    name: 'required|string',
    isPrivate: 'required|boolean',
    color: 'required|string',
    userId: 'required|string',
    folderId: 'string',
};

export const updateSetValidation = {
    _id: 'required|string',
};

export const deleteSetValidation = {
    _id: 'required|string',
};

export const getSetValidation = {
    userId: 'required|string'
};

export const getSetByFolderValidation = {
    folderId: 'required|string',
    userId: 'required|string'
};