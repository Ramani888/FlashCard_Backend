export const MediatorApiSource = {
    get: {
        getMediatorSet: { path: '/mediator/set', message: 'Sets Get Successfully.' }
    },
    put: {
        updateMediatorSet: { path: '/mediator/set', message: 'Set Update Successfully.' },
        updateMediatorCard: { path: '/mediator/card', message: 'Card Update Successfully.'}
    }
}