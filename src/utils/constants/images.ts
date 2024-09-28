export const ImagesApiSource = {
    post: {
        uploadImage: { path: '/images', message: 'Image Upload Successfully.' }
    },
    put: {
        updateImage: { path: '/images', message: 'Image Update Successfully.'}
    },
    get: {
        getImages: { path: '/images',  message: 'Images Get Successfully.' }
    },
    delete: {
        deleteImage: { path: '/images',  message: 'Image Deleted Successfully.' }
    },
}