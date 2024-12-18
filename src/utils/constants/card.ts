export const CardApiSource = {
    post: {
        createCard: { path: '/card',  message: 'Card Created Successfully.' }
    },
    put: {
        updateCard: { path: '/card',  message: 'Card Updated Successfully.' },
        blurAllCard: { path: '/blur/all/card', message: 'Blur All Card Successfully.', messageForUnblur: 'Remove Blur From All Card Successfully.' },
        moveCard: { path: '/move/card', message: 'Move Card Successfully.'}
    },
    delete: {
        deleteCard: { path: '/card',  message: 'Card Deleted Successfully.' }
    },
    get: {
        getCard: { path: '/card',  message: 'Card get Successfully.' },
        getCardType: { path: '/card/type',  message: 'Card Type Get Successfully.' },
        getAllCard: { path: '/card/all', message: 'Card get Successfully.'}
    }
}