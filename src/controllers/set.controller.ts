import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { deleteSetData, getSetData, getSetDataByfolderId, insertSetData, updateSetData } from "../services/set.services";
import { SetApiSource } from "../utils/constants/set";
import { getCardBySetId, updateCardData } from "../services/card.service";

export const insertSet = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        await insertSetData(bodyData);
        res.status(StatusCodes.OK).send({ success: true, message: SetApiSource.post.createSet.message});
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const updateSet = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        await updateSetData(bodyData);

        // Get all set cards
        const cards = await getCardBySetId(bodyData?._id);
        cards?.forEach(async (card) => {
            const data = {
                ...card,
                folderId: bodyData?.folderId ?? '',
                note: card?.note ?? ''
            }
            await updateCardData(data);
        });

        res.status(StatusCodes.OK).send({ success: true, message: SetApiSource.put.updateSet.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const deleteSet = async (req: AuthorizedRequest, res: Response) => {
    const { _id } = req.query;
    try {
        await deleteSetData(_id);
        res.status(StatusCodes.OK).send({ success: true, message: SetApiSource.delete.deleteSet.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const getSet = async (req: AuthorizedRequest, res: Response) => {
    const { userId, search } = req.query;
    try {
        const data = await getSetData(userId, search);
        res.status(StatusCodes.OK).send(data);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const getSetByfolderId = async (req: AuthorizedRequest, res: Response) => {
    const { folderId, userId, search } = req.query;
    try {
        const data = await getSetDataByfolderId(folderId, userId, search);
        res.status(StatusCodes.OK).send(data);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}