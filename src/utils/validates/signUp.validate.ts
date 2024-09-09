export const signUpValidation = {
    email: 'required|email',
    userName: 'required|string',
    password: 'required|string'
};

export const verifyOtpValidation = {
    email: 'required|email',
    otp: 'required|numeric'
}