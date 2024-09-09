import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { deleteSetData, getSetDataBycardTypeId, getSetDataByfolderId, insertSetData, updateSetData } from "../services/set.services";
import { SetApiSource } from "../utils/constants/set";

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

export const getSetBycardTypeId = async (req: AuthorizedRequest, res: Response) => {
    const { cardTypeId, userId } = req.query;
    try {
        const data = await getSetDataBycardTypeId(cardTypeId, userId);
        res.status(StatusCodes.OK).send(data);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const getSetByfolderId = async (req: AuthorizedRequest, res: Response) => {
    const { folderId, cardTypeId, userId } = req.query;
    try {
        const data = await getSetDataByfolderId(folderId, cardTypeId, userId);
        res.status(StatusCodes.OK).send(data);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}