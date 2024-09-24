export const NotesApiSource = {
    post: {
        createNotes: { path: '/notes', message: 'Notes Created Successfully.' }
    },
    put: {
        updateNotes: { path: '/notes', message: 'Notes Updated Successfully.'}
    },
    delete: {
        deleteNotes: { path: '/notes', message: 'Notes Deleted Successfully.'}
    },
    get: {
        getNotes: { path: '/notes', message: 'Notes Get Successfully.'}
    }
}