export const createNotesValidation = {
    name: 'required|string',
    color: 'required|string',
    userId: 'required|string',
    note: 'string',
    isHighlight: 'required|boolean'
};

export const updateNotesValidation = {
    _id: 'required|string',
};

export const deleteNotesValidation = {
    _id: 'required|string',
};

export const getNotesValidation = {
    userId: 'required|string'
};