import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { getMediatorSetData } from "../services/mediator.service";
import { getSetBySetId, insertSetData } from "../services/set.services";
import { createCardData, getCardBySetId } from "../services/card.service";
import { MediatorApiSource } from "../utils/constants/mediator";

export const getMediatorSet = async (req: AuthorizedRequest, res: Response) => {
    const { userId } = req.query;
    try {
        const data = await getMediatorSetData(userId);
        res.status(StatusCodes.OK).send(data);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const updateMediatorSet = async (req: AuthorizedRequest, res: Response) => {
    const { userId, setId, folderId } = req.query;
    try {
        //Get set data
        const setData = await getSetBySetId(setId);

        //Copy to create new set
        const newSetData = {
            name: setData?.name ?? '',
            isPrivate: setData?.isPrivate ?? false,
            color: setData?.color ?? '',
            userId: userId,
            folderId: folderId,
            isHighlight: setData?.isHighlight ?? false
        }
        const newSetId = await insertSetData(newSetData);

        //Get card data
        const cardData = await getCardBySetId(setId);

        //Copy to create card
        cardData?.map(async (item) => {
            const newCardData = {
                top: item?.top,
                bottom: item?.bottom,
                note: item?.note ?? '',
                folderId: folderId,
                setId: newSetId?.toString(),
                userId: userId,
                isBlur: item?.isBlur,
                position: item?.position
            }
            await createCardData(newCardData)
        })
        
        res.status(StatusCodes.OK).send({ success: true, message: MediatorApiSource.put.updateMediatorSet.message }); 
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}