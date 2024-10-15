export const ProfileApiSource = {
    put: {
        updateProfilePicture: { path: '/profile/picture', message: 'Profile Picture Update Successfully.' },
        updatePassword: { path: '/profile/password', message: 'OTP Send Successfully.' },
        updatePasswordVerifyOtp: { path: '/profile/verifyOtp', message: 'Password Update Successfully.' }
    },
    get: {
        getSubscription: { path: '/profile/subscription', message: 'Profile subscription data get successfully.' }
    },
    post: {
        createSupport: { path: '/profile/support', message: 'Your issue has been successfully submitted.' }
    }
}