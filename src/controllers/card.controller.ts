import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { blurAllCardData, createCardData, deleteCardData, getCardByCardId, getCardBySetId, getCardData, getCardTypeData, getCardWithLargestPosition, updateCardData } from "../services/card.service";
import { CardApiSource } from "../utils/constants/card";

export const getCardType = async (req: AuthorizedRequest, res: Response) => {
    try {
        const data = await getCardTypeData();
        res.status(StatusCodes.OK).send(data);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const createCard = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        const cardData = await getCardWithLargestPosition(bodyData?.userId, bodyData?.setId);
        const position = cardData ? cardData?.position + 1 : 1;
        await createCardData({...bodyData, position: position});
        res.status(StatusCodes.OK).send({ success: true, message: CardApiSource.post.createCard.message }); 
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const updateCard = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        await updateCardData(bodyData);
        res.status(StatusCodes.OK).send({ success: true, message: CardApiSource.put.updateCard.message }); 
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const getCard = async (req: AuthorizedRequest, res: Response) => {
    const { setId, userId } = req.query;
    try {
        const data = await getCardData(setId, userId);
        res.status(StatusCodes.OK).send(data);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const deleteCard = async (req: AuthorizedRequest, res: Response) => {
    const { _id } = req.query;
    try {
        await deleteCardData(_id);
        res.status(StatusCodes.OK).send({ success: true, message: CardApiSource.delete.deleteCard.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const blurAllCard = async (req: AuthorizedRequest, res: Response) => {
    const { setId, isBlur } = req.query;
    try {
        const cardData = await getCardBySetId(setId);
        const updateCardData = cardData?.map((item) => {
            return {
                ...item,
                isBlur: isBlur === 'true' ?  true : false
            }
        })
        await blurAllCardData(updateCardData);
        if (isBlur === 'true') {
            res.status(StatusCodes.OK).send({ success: true, message: CardApiSource.put.blurAllCard.message});
        } else {
            res.status(StatusCodes.OK).send({ success: true, message: CardApiSource.put.blurAllCard.messageForUnblur });
        }
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const moveCard = async (req: AuthorizedRequest, res: Response) => {
    const { setId, cardId } = req.query;
    try {
        const cardData = await getCardByCardId(cardId);
        if (cardData) {
            const updatedCardData = {
                ...cardData.toObject(),
                setId: setId,
                folderId: cardData.folderId || '',
                note: cardData?.note || '',
            };
            await updateCardData(updatedCardData);
        }
        res.status(StatusCodes.OK).send({ success: true, message: CardApiSource.put.moveCard.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}