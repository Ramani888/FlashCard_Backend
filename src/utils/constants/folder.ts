export const FolderApiSource = {
    post: {
        createFolder: { path: '/folder',  message: 'Folder Created Successfully.' }
    },
    put: {
        updateFolder: { path: '/folder',  message: 'Folder Updated Successfully.' },
        assignFolder: { path: '/assign/folder', message: 'Assign Folder Successfully.'}
    },
    delete: {
        deleteFolder: { path: '/folder',  message: 'Folder Deleted Successfully.' }
    },
    get: {
        getFolder: { path: '/folder',  message: 'Folder get Successfully.' }
    }
}