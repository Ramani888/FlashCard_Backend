export const signUpValidation = {
    email: 'required|email',
    userName: 'required|string',
    password: 'required|string',
    isPrivacy: 'required|boolean'
};

export const verifyOtpValidation = {
    email: 'required|email',
    otp: 'required|numeric',
    language: 'required|string'
}

export const resendOtpValidation = {
    email: 'required|email',
}