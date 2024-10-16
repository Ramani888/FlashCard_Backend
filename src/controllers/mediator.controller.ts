import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { getMediatorSetData } from "../services/mediator.service";

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