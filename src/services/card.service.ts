import { Card } from "../models/card.model";
import { CardType } from "../models/cardType.model";
import { ICard } from "../types/card";

export const getCardTypeData = async () => {
    try {
        const result = await CardType.find();
        return result;
    } catch (err) {
        throw err;
    }
}

export const createCardData = async (data: ICard) => {
    try {
        const newData = new Card(data);
        await newData.save();
    } catch (err) {
        throw err;
    }
}