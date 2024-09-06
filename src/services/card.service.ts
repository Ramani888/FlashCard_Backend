import { CardType } from "../models/cardType.model";

export const getCardTypeData = async () => {
    try {
        const result = await CardType.find();
        return result;
    } catch (err) {
        throw err;
    }
}