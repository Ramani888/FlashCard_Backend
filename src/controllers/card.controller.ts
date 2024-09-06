import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { getCardTypeData } from "../services/card.service";

export const getCardType = async (req: AuthorizedRequest, res: Response) => {
    try {
        const data = await getCardTypeData();
        res.status(StatusCodes.OK).send(data);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}