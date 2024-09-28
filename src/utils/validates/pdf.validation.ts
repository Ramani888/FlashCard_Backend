export const uploadPdfValidation = {
    userId: 'required|string',
    color: 'required|string'
};

export const updatePdfValidation = {
    _id: 'required|string',
};

export const getPdfValidation = {
    userId: 'required|string'
};

export const deletePdfValidation = {
    _id: 'required|string',
};