import { language } from "googleapis/build/src/apis/language"

export const updateUserCreditValidation = {
    userId: 'required|string',
    credit: 'required|numeric',
    type: 'required|string'
}

export const addDefaultSetsAndCardsValidation = {
    userId: 'required|string',
    language: 'required|string'
}

export const addAutoTranslateSetsAndCardsValidation = {
    language: 'required|string'
}