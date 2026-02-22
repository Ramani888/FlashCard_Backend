export const UserApiSource = {
    put: {
        updateCredit: { path: '/credit',  message: 'AI Credit Updated Successfully.' }
    },
    post: {
        addDefaultSetsAndCards: { path: '/addDefaultSetsAndCards', message: 'Default Sets and Cards Added Successfully.' },
        addAutoTranslateSetsAndCards: { path: '/addAutoTranslateSetsAndCards', message: 'Auto Translate Sets and Cards Added Successfully.' }
    },
    delete: {
        deleteAccount: { path: '/account', message: 'Account Deleted Successfully.' }
    }
}

export const defaultUserId = '66e737daf9aa4eac9897d37d';