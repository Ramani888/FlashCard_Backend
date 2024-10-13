export const SignUpApiSource = {
    post: {
        signUp: { path: '/signUp', message: 'Otp Send Successfully.' },
        verifyOtp: { path: '/signUp/verifyOtp', meessage: 'Otp Verified Successfully.', userSuccessMsg: 'User Created Successfully.' }
    },
    put: {
        resendOtp: { path: '/signUp/resendOtp', message: 'Otp Send Successfully.' }
    }
}