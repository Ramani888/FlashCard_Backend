export const uploadPdfValidation = {
    userId: 'required|string',
    color: 'required|string',
    name: 'required|string',
    isHighlight: 'required|boolean',
};

export const updatePdfValidation = {
    _id: 'required|string',
};

export const getPdfValidation = {
    userId: 'required|string'
};

export const getPdfByFolderIdValidation = {
    userId: 'required|string',
    folderId: 'required|string'
};

export const deletePdfValidation = {
    _id: 'required|string',
};

export const assignPdfFolderValidation = {
    _id: 'required|string',
    folderId: 'required|string'
};