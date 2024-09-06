export const createSetValidation = {
    name: 'required|string',
    isPrivate: 'required|boolean',
    color: 'required|string',
    cardTypeId: 'required|string'
};

export const updateSetValidation = {
    _id: 'required|string',
};

export const deleteSetValidation = {
    _id: 'required|string',
};

export const getSetValidation = {
    cardTypeId: 'required|string',
};