export const createfolderValidation = {
    name: 'required|string',
    color: 'required|string',
    userId: 'required|string',
    isHighlight: 'required|boolean'
};

export const updateFolderValidation = {
    _id: 'required|string',
};

export const deleteFolderValidation = {
    _id: 'required|string',
};

export const getFolderValidation = {
    userId: 'required|string',
    search: 'string'
};

export const assignFolderValidation = {
    folderId: 'required|string',
    setId: 'required|string'
}

export const createImagesFolderValidation = {
    name: 'required|string',
    color: 'required|string',
    userId: 'required|string',
    isHighlight: 'required|boolean'
};

export const updateImagesFolderValidation = {
    _id: 'required|string',
};

export const getImagesFolderValidation = {
    userId: 'required|string'
};

export const deleteImagesFolderValidation = {
    _id: 'required|string',
};

export const createPdfFolderValidation = {
    name: 'required|string',
    color: 'required|string',
    userId: 'required|string',
    isHighlight: 'required|boolean'
};

export const updatePdfFolderValidation = {
    _id: 'required|string',
};

export const getPdfFolderValidation = {
    userId: 'required|string'
};

export const deletePdfFolderValidation = {
    _id: 'required|string',
};

