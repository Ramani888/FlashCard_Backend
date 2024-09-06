import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { deleteSetData, getSetDataBycardTypeId, insertSetData, updateSetData } from "../services/set.services";

export const insertSet = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        await insertSetData(bodyData);
        res.status(StatusCodes.OK).send({ success: true, message: "Set Created Successfully." });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const updateSet = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        await updateSetData(bodyData);
        res.status(StatusCodes.OK).send({ success: true, message: "Set Updated Successfully." });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const deleteSet = async (req: AuthorizedRequest, res: Response) => {
    const { _id } = req.query;
    try {
        await deleteSetData(_id);
        res.status(StatusCodes.OK).send({ success: true, message: "Set Deleted Successfully." });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const getSetBycardTypeId = async (req: AuthorizedRequest, res: Response) => {
    const { cardTypeId } = req.query;
    try {
        const data = await getSetDataBycardTypeId(cardTypeId);
        res.status(StatusCodes.OK).send(data);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}