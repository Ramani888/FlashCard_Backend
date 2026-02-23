export const createSetValidation = {
    name: 'required|string',
    color: 'required|string',
    userId: 'required|string',
    folderId: 'string',
    isHighlight: 'required|boolean',
};

export const updateSetValidation = {
    _id: 'required|string',
};

export const deleteSetValidation = {
    _id: 'required|string',
};

export const getSetValidation = {
    userId: 'required|string',
    search: 'string',
};

export const getSetByFolderValidation = {
    folderId: 'required|string',
    userId: 'required|string',
    search: 'string',
};