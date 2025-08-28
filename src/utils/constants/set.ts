export const SetApiSource = {
    post: {
        createSet: { path: '/set',  message: 'Set Created Successfully.' }
    },
    put: {
        updateSet: { path: '/set',  message: 'Set Updated Successfully.' }
    },
    delete: {
        deleteSet: { path: '/set',  message: 'Set Deleted Successfully.' }
    },
    get: {
        getSet: { path: '/set',  message: 'Set get Successfully.' },
        getSetByFolderId: { path: '/folder/set', message: 'Set get Successfully.'}
    }
}

export enum DefaultSetName {
    En = "SetEn",
    Cn = "SetCn",
    Tl = "SetTl",
    Fr = "SetFr",
    De = "SetDe",
    Hi = "SetHi",
    Id = "SetId",
    It = "SetIt",
    Pl = "SetPl",
    Pt = "SetPt",
    Es = "SetEs",
    Sw = "SetSw"
}