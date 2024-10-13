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