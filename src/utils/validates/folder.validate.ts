export const createfolderValidation = {
    name: 'required|string',
    isPrivate: 'required|boolean',
    color: 'required|string',
    cardTypeId: 'required|string',
    userId: 'required|string'
};

export const updateFolderValidation = {
    _id: 'required|string',
};

export const deleteFolderValidation = {
    _id: 'required|string',
};

export const getFolderValidation = {
    cardTypeId: 'required|string',
    userId: 'required|string'
};

export const assignFolderValidation = {
    folderId: 'required|string',
    setId: 'required|string'
}
