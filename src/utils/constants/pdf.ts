export const PdfApiSource = {
    post: {
        uploadPdf: { path: '/pdf', message: 'Pdf Upload Successfully.' }
    },
    put: {
        updatePdf: { path: '/pdf', message: 'Pdf Update Successfully.'},
        assignPdfFolder: { path: '/assign/pdf/folder', message: 'Pdf Assign Folder Successfully.' }
    },
    get: {
        getPdf: { path: '/pdf',  message: 'Pdf Get Successfully.' },
        getPdfByFolderId: { path: '/folder/pdf', message: 'Pdf Get Successfully.'}
    },
    delete: {
        deletePdf: { path: '/pdf',  message: 'Pdf Deleted Successfully.' }
    },
}