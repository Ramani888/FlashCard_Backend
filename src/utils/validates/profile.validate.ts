export const updateProfilePictureValidation = {
    _id: 'required|string',
}

export const updatePasswordValidation = {
    email: 'required|email',
    password: 'required|string'
}

export const updatePasswordVerifyOtpValidation = {
    email: 'required|email',
    password: 'required|string',
    otp: 'required|numeric'
}

export const createSupportValidation = {
    userId: 'required|string',
    supportType: 'required|string',
    supportMessage: 'required|string'
}

export const getProfileValidation = {
    userId: 'required|string',
}