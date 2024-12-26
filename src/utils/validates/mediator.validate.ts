export const getMediatorSetValidation = {
    userId: 'required|string'
};

export const updateMediatorSetValidation = {
    userId: 'required|string',
    setId: 'required|string',
    folderId: 'string'
};

export const updateMediatorCardValidation = {
    userId: 'required|string',
    setId: 'required|string',
    cardId: 'required|string'
};

