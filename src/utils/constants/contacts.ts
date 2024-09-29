export const ContactsApiSource = {
    get: {
        getUsers: { path: '/contacts/users', message: 'Users Get Successfully.' },
        getContacts: { path: '/contacts', message: "Contacts Get Successfully." }
    },
    post: {
        addContacts: { path: '/contacts', message: 'Contacts Add Successfully.' }
    },
    delete: {
        deleteContacts: { path: '/contacts',  message: 'Contacts Deleted Successfully.' }
    },
}