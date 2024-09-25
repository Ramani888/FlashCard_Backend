export const createCardValidation = {
    top: 'required|string',
    bottom: 'required|string',
    note: 'string',
    setId: 'required|string',
    folderId: 'string',
    userId: 'required|string',
    isBlur: 'boolean'
};

export const updateCardValidation = {
    _id: 'required|string',
};

export const getCardValidation = {
    setId: 'required|string',
    folderId: 'string',
    userId: 'required|string'
};

export const deleteCardValidation = {
    _id: 'required|string',
};

export const blurAllCardValidation = {
    setId: 'required|string',
    isBlur: 'required|boolean'
};

export const moveCardValidation = {
    setId: 'required|string',
    cardId: 'required|string'
};
