export const createSetValidation = {
    name: 'required|string',
    isPrivate: 'required|boolean',
    color: 'required|string',
    userId: 'required|string',
    cardTypeId: 'required|string',
    folderId: 'required|string',
};

export const updateSetValidation = {
    _id: 'required|string',
};

export const deleteSetValidation = {
    _id: 'required|string',
};

export const getSetValidation = {
    cardTypeId: 'required|string',
    userId: 'required|string'
};

export const getSetByFolderValidation = {
    folderId: 'required|string',
    cardTypeId: 'required|string',
    userId: 'required|string'
};