export const LoginApiSource = {
    post: {
        login: {
            path: '/login',
            messages: {
                success: 'Logged in successfully.',
                invalidEmail: 'Email does not exist.',
                invalidPassword: 'Password does not match.'
            }
        }
    }
};