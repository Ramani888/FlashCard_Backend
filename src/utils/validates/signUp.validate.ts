export const signUpValidation = {
    email: 'required|email',
    userName: 'required|string',
    password: 'required|string',
    isPrivacy: 'required|boolean'
};

export const verifyOtpValidation = {
    email: 'required|email',
    otp: 'required|numeric'
}

export const resendOtpValidation = {
    email: 'required|email',
}