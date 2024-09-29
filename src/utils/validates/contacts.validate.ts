export const getUsersValidation = {
    search: 'required|string',
    userId: 'required|string'
};

export const addContactsValidation = {
    userId: 'required|string',
    contactUserId: 'required|string'
};

export const getContactsValidation = {
    userId: 'required|string'
}

export const deleteContactsValidation = {
    _id: 'required|string',
};